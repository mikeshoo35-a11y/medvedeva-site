"""One-off: prepare owner portrait for CMP-09 (3:4, site palette). Source: consultation/owner_photo.jpeg"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
from rembg import remove

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "consultation" / "owner_photo.jpeg"
OUT = Path(__file__).resolve().parents[1] / "public" / "owner-portrait.jpg"

SURFACE_ALT = (247, 245, 242)  # #F7F5F2
ACCENT_MUTED = (232, 220, 196)  # #E8DCC4
OUTPUT_SIZE = (960, 1280)
CANVAS_MARGIN = 0.04


def warm_gradient(size: tuple[int, int]) -> Image.Image:
    w, h = size
    base = Image.new("RGB", size, SURFACE_ALT)
    draw = ImageDraw.Draw(base)
    for y in range(h):
        t = y / max(h - 1, 1)
        r = int(SURFACE_ALT[0] + (ACCENT_MUTED[0] - SURFACE_ALT[0]) * t * 0.35)
        g = int(SURFACE_ALT[1] + (ACCENT_MUTED[1] - SURFACE_ALT[1]) * t * 0.35)
        b = int(SURFACE_ALT[2] + (ACCENT_MUTED[2] - SURFACE_ALT[2]) * t * 0.35)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
    return base


def alpha_centroid(img: Image.Image) -> tuple[float, float]:
    alpha = img.split()[3]
    xs = ys = 0.0
    count = 0
    for y in range(img.height):
        for x in range(img.width):
            if alpha.getpixel((x, y)) > 40:
                xs += x
                ys += y
                count += 1
    if count == 0:
        return img.width / 2, img.height / 2
    return xs / count, ys / count


def crop_source_region(src: Image.Image) -> Image.Image:
    """Keep full head and shoulders; stop above tableware."""
    w, h = src.size
    crop_h = int(h * 0.78)
    crop_w = int(crop_h * 3 / 4)
    top = 0
    # Anchor to the right edge of the square source so the face is never clipped.
    left = max(0, w - crop_w - 6)
    return src.crop((left, top, left + crop_w, top + crop_h))


def soften_cutout_edges(subject: Image.Image) -> Image.Image:
    r, g, b, a = subject.split()
    a = a.filter(ImageFilter.GaussianBlur(radius=2))
    return Image.merge("RGBA", (r, g, b, a))


def pad_cutout(subject: Image.Image) -> Image.Image:
    bbox = subject.getbbox()
    if not bbox:
        return subject
    subject = subject.crop(bbox)
    pad_x = max(40, int(subject.width * 0.08))
    pad_top = max(56, int(subject.height * 0.12))
    pad_bottom = max(36, int(subject.height * 0.06))
    padded = Image.new(
        "RGBA",
        (subject.width + pad_x * 2, subject.height + pad_top + pad_bottom),
        (0, 0, 0, 0),
    )
    padded.paste(subject, (pad_x, pad_top), subject)
    return padded


def fit_subject_on_canvas(subject: Image.Image, canvas: Image.Image) -> Image.Image:
    canvas = canvas.convert("RGBA")
    out_w, out_h = canvas.size
    subj_w, subj_h = subject.size
    margin = int(min(out_w, out_h) * CANVAS_MARGIN)
    max_w = out_w - 2 * margin
    max_h = out_h - 2 * margin

    scale = min(max_w / subj_w, max_h / subj_h)
    new_size = (max(1, int(subj_w * scale)), max(1, int(subj_h * scale)))
    subject = subject.resize(new_size, Image.LANCZOS)
    pos_x = (out_w - new_size[0]) // 2
    pos_y = (out_h - new_size[1]) // 2

    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_layer = Image.new("RGBA", new_size, (27, 58, 75, 35))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=14))
    shadow.paste(shadow_layer, (pos_x, pos_y + 5), shadow_layer)
    canvas = Image.alpha_composite(canvas, shadow)
    canvas.paste(subject, (pos_x, pos_y), subject)
    return canvas


def main() -> None:
    src = Image.open(SRC).convert("RGB")
    cropped = crop_source_region(src)

    subject = remove(cropped).convert("RGBA")
    subject = soften_cutout_edges(subject)
    subject = pad_cutout(subject)

    canvas = warm_gradient(OUTPUT_SIZE)
    canvas = fit_subject_on_canvas(subject, canvas)

    result = canvas.convert("RGB")
    result = ImageEnhance.Color(result).enhance(0.94)
    result = ImageEnhance.Contrast(result).enhance(1.04)
    result = ImageEnhance.Brightness(result).enhance(1.02)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    result.save(OUT, format="JPEG", quality=86, optimize=True, progressive=True)
    print(f"Wrote {OUT} ({result.size[0]}x{result.size[1]})")


if __name__ == "__main__":
    main()
