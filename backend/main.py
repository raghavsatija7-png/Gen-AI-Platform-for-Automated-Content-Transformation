from instructions import SYSTEM_INSTRUCTION, build_transformation_prompt
from ai_engine import generate_content
from output_generator import generate_output
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from typing import List
import tempfile
from pathlib import Path

from input_processor import process_file, process_text


app = FastAPI(
    title="AI Content Transformation Platform",
    description="AI-powered platform for transforming source content into requested communication artefacts.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://gen-ai-platform-for-automated-content-transformation-8k0dzxe94.vercel.app"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Maps output_format -> correct Content-Type for the download
MEDIA_TYPES = {
    "PDF": "application/pdf",
    "DOCX": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "PNG": "image/png",
}

@app.get("/")
def root():
    return {
        "message": "AI Content Transformation API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/transform")
async def transform_content(
    source_text: str = Form(""),
    files: List[UploadFile] = File(None),
    audience: str = Form(...),
    objective: str = Form(...),
    tone: str = Form(...),
    language: str = Form(...),
    detail_level: str = Form(...),
    content_style: str = Form(...),
    output_type: str = Form(...),
    output_format: str = Form(...),
    additional_instructions: str = Form("")
):
    extracted_contents = []

    # Process text entered directly by the user
    if source_text and source_text.strip():
        extracted_contents.append(
            process_text(source_text)
        )

    # Process uploaded files
    if files:
        for uploaded_file in files:
            if not uploaded_file.filename:
                continue

            file_extension = Path(uploaded_file.filename).suffix.lower()

            with tempfile.NamedTemporaryFile(
                delete=False,
                suffix=file_extension
            ) as temp_file:
                file_content = await uploaded_file.read()
                temp_file.write(file_content)
                temp_file_path = temp_file.name

            try:
                extracted_content = process_file(temp_file_path)
                extracted_contents.append(
                    f"===== {uploaded_file.filename} =====\n\n"
                    f"{extracted_content}"
                )
            except Exception as error:
                raise HTTPException(
                    status_code=400,
                    detail=f"Could not process '{uploaded_file.filename}': {error}"
                )
            finally:
                Path(temp_file_path).unlink(missing_ok=True)

    # Make sure at least one source was provided
    if not extracted_contents:
        raise HTTPException(
            status_code=400,
            detail="Please provide source text or upload at least one file."
        )

    # Combine all source content
    combined_source_content = "\n\n".join(extracted_contents)
    transformation_prompt = build_transformation_prompt(
        source_content=combined_source_content,
        audience=audience,
        objective=objective,
        tone=tone,
        language=language,
        detail_level=detail_level,
        content_style=content_style,
        output_type=output_type,
        additional_instructions=additional_instructions,
    )

    try:
        generated_content = generate_content(
            system_instruction=SYSTEM_INSTRUCTION,
            user_prompt=transformation_prompt
        )
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"LLM Generation Error: {error}"
        )

    output_directory = Path("generated_outputs")
    output_directory.mkdir(exist_ok=True)

    file_extension = output_format.lower()
    output_file_path = output_directory / f"transformed_content.{file_extension}"

    try:
        generate_output(
            content=generated_content,
            output_format=output_format,
            output_path=str(output_file_path)
        )
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Output Generation Error ({output_format}): {error}"
        )

    return FileResponse(
        path=str(output_file_path),
        filename=output_file_path.name,
        media_type=MEDIA_TYPES.get(output_format.upper(), "application/octet-stream")
    )