import os

from dotenv import load_dotenv

load_dotenv()

LLM_API_KEY = os.getenv("LLM_API_KEY")

LLM_MODEL = os.getenv("LLM_MODEL", "openai/gpt-oss-120b")

HF_TOKEN = os.getenv("HF_TOKEN")