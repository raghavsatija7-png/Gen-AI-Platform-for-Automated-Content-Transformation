from instructions import SYSTEM_INSTRUCTION, build_transformation_prompt
from ai_engine import generate_content


source = """
Kolkata experienced three major security incidents during August.
The incidents affected several public areas and caused disruption.
Authorities are investigating the incidents and reviewing security measures.
"""


prompt = build_transformation_prompt(
    source_content=source,
    audience="Department Head",
    objective="Briefing",
    tone="Formal",
    language="English",
    detail_level="Concise",
    content_style="Professional",
    output_type="Executive Summary"
)
print("Sending request to Groq...")

result = generate_content(
    system_instruction=SYSTEM_INSTRUCTION,
    user_prompt=prompt
)

print("Response received!")
print("\n========== GENERATED OUTPUT ==========\n")
print(result)