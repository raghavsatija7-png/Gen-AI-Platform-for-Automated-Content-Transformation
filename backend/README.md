# AI Content Transformation Platform - Backend

An AI-powered content transformation backend built with **FastAPI**. This system processes multimodal inputs (PDFs, DOCX files, raw text, and images) and transforms them into targeted communication artefacts formatted as **PDF**, **DOCX**, or generated **PNG** infographics.

---

## Features

- **Multimodal Source Processing**: Extracts content from `.pdf`, `.docx`, `.txt`, `.md`, `.csv`, `.rtf`, `.png`, `.jpg`, `.jpeg`, and `.webp`.
- **LLM Text Transformation Engine**: Powered by Groq API (`ai_engine.py`) to adapt content tone, audience, detail level, language, and output type without hallucinating facts.
- **Vision & Image Generation**:
  - OCR & Vision analysis powered by Hugging Face (`Qwen/Qwen2.5-VL-3B-Instruct`).
  - Infographic generation powered by Hugging Face (`black-forest-labs/FLUX.1-schnell`).
- **Dynamic File Generation**: Formats transformed outputs into downloadable PDF documents (via ReportLab), Word documents (via python-docx), or generated PNG images.
- **CORS & Deployment Ready**: Pre-configured CORS middleware for frontend communication and a `Procfile` for platform deployment.

---

## System Architecture & File Overview

| File | Purpose |
|---|---|
| `main.py` | FastAPI application endpoints (`/transform`, `/health`, `/`) and file download handler. |
| `ai_engine.py` | Groq API integration for structured text transformations. |
| `gemini_engine.py` | Hugging Face integration for vision extraction and text-to-image rendering. |
| `input_processor.py` | Ingestion pipeline for extracting text from PDFs, DOCX, raw text, and images. |
| `output_generator.py` | Document compiler converting markdown AI outputs to ReportLab PDFs, DOCX, or PNG. |
| `instructions.py` | System prompts and prompt builder enforcing strict factual accuracy rules. |
| `config.py` | Environment variable loader using `python-dotenv`. |
| `requirements.txt` | Dependency specifications for the backend. |
| `Procfile` | Production server execution specification. |
| `test_ai.py` | Standalone script to test Groq LLM text transformation pipeline. |
| `test_gemini.py` | Standalone script to test Hugging Face vision and image generation pipeline. |

---

## Environment Configuration

Create a `.env` file in the root of the `backend` directory with the following variables:

```env
LLM_API_KEY=your_groq_api_key
LLM_MODEL=openai/gpt-oss-120b
HF_TOKEN=your_huggingface_api_token
```

---

## Installation & Setup

1. **Navigate to backend directory**:
   ```bash
   cd path/to/backend
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate    # On macOS/Linux
   # or: venv\Scripts\activate # On Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Development Server**:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

---

## API Reference

### 1. Health Check
- **Endpoint**: `GET /health`
- **Response**: `{"status": "healthy"}`

### 2. Transform Content
- **Endpoint**: `POST /transform`
- **Content-Type**: `multipart/form-data`

#### Parameters:
| Field | Type | Required | Description |
|---|---|---|---|
| `source_text` | `string` | Optional | Direct plain text input |
| `files` | `file[]` | Optional | Uploaded documents or images |
| `audience` | `string` | Required | Target audience (e.g. "Executive", "General Public") |
| `objective` | `string` | Required | Goal (e.g. "Briefing", "Education") |
| `tone` | `string` | Required | Desired tone (e.g. "Formal", "Persuasive") |
| `language` | `string` | Required | Language of the output (e.g. "English") |
| `detail_level` | `string` | Required | `Concise`, `Moderate`, or `Detailed` |
| `content_style` | `string` | Required | Writing style guidelines |
| `output_type` | `string` | Required | Artifact format (e.g. "Executive Summary", "Infographic") |
| `output_format` | `string` | Required | Output file extension: `PDF`, `DOCX`, or `PNG` |
| `additional_instructions` | `string` | Optional | Custom rules or constraints |

#### Response:
- Returns the generated output file directly as a `FileResponse` with appropriate MIME types (`application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, or `image/png`).

---

## Standalone Testing

Run test scripts directly to test individual sub-components without launching the web server:

- **Test Groq LLM Text Pipeline**:
  ```bash
  python test_ai.py
  ```

- **Test Hugging Face Vision / Image Pipeline**:
  ```bash
  python test_gemini.py
  ```
