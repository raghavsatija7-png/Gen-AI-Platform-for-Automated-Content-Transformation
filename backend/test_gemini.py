"""
test_gemini.py

Standalone script to test the Gemini image pipeline directly,
WITHOUT going through FastAPI/CORS/the frontend. Run this from
inside the backend folder:

    python test_gemini.py

If something is broken, the real error/traceback will show up
here in full — much easier to debug than "Failed to fetch" in
the browser, which only tells you the frontend didn't get a
response, not why.
"""

from pathlib import Path

from gemini_engine import extract_content_from_image, generate_image_from_content


def test_vision():
    # Change this to point at any real image file you have locally
    test_image_path = Path("test_image.png")

    if not test_image_path.exists():
        print(f"[SKIPPED] Vision test — put an image at {test_image_path} to test this")
        return

    image_bytes = test_image_path.read_bytes()
    extension = test_image_path.suffix.lower()

    mime_map = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
    }

    print("Testing vision extraction...")
    result = extract_content_from_image(image_bytes, mime_map[extension])
    print("VISION OUTPUT:\n", result)


def test_image_generation():
    print("\nTesting image generation...")
    generate_image_from_content(
        "A simple summary poster about renewable energy sources.",
        "test_output.png",
    )
    print("Image generation succeeded — check backend/test_output.png")


if __name__ == "__main__":
    test_vision()
    test_image_generation()