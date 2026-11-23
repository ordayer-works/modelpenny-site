"""Packs tools/icon-256.png (drawn by render_images.mjs) into favicon.ico at 16, 32 and 48 pixels."""

from pathlib import Path

from PIL import Image

root = Path(__file__).resolve().parent.parent
icon = Image.open(root / "tools" / "icon-256.png").convert("RGBA")
icon.save(root / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("favicon.ico written")
