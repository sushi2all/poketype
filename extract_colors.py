#!/usr/bin/env python3
"""Extract dominant colors from Pokémon type icons"""
import os
from pathlib import Path

try:
    from PIL import Image
    import numpy as np
except ImportError:
    print("PIL/Pillow not available. Trying alternative method...")
    Image = None

def rgb_to_hex(rgb):
    """Convert RGB tuple to hex color"""
    return f"#{rgb[0]:02X}{rgb[1]:02X}{rgb[2]:02X}"

def get_dominant_color_pil(image_path):
    """Extract dominant color using PIL"""
    img = Image.open(image_path)
    img = img.convert('RGB')
    
    # Resize to speed up processing
    img.thumbnail((100, 100))
    
    # Get all pixels
    pixels = list(img.getdata())
    
    # Calculate average color
    r = sum(p[0] for p in pixels) // len(pixels)
    g = sum(p[1] for p in pixels) // len(pixels)
    b = sum(p[2] for p in pixels) // len(pixels)
    
    return (r, g, b)

def main():
    types_dir = Path('public/types')
    colors = {}
    
    if Image is None:
        print("Error: PIL/Pillow is required. Install with: pip install Pillow")
        return
    
    type_files = sorted(types_dir.glob('*.png'))
    
    for type_file in type_files:
        type_name = type_file.stem
        try:
            rgb = get_dominant_color_pil(type_file)
            hex_color = rgb_to_hex(rgb)
            colors[type_name] = hex_color
            print(f"{type_name}: {hex_color} (RGB: {rgb})")
        except Exception as e:
            print(f"Error processing {type_name}: {e}")
    
    print("\n=== Colors object ===")
    print("export const typeColors = {")
    for type_name in sorted(colors.keys()):
        print(f"  {type_name}: '{colors[type_name]}',")
    print("};")

if __name__ == '__main__':
    main()

