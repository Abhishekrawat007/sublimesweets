import os
from PIL import Image
import sys

def compress_images(folder_path, quality=75):
    """
    Bulk compress images to 600x600 WebP format
    Replaces original files with compressed versions
    """
    
    # Supported formats
    supported_formats = ('.png', '.jpg', '.jpeg', '.webp', '.gif')
    
    print("🔥 BULK IMAGE COMPRESSOR STARTED")
    print(f"📁 Scanning folder: {folder_path}\n")
    
    if not os.path.exists(folder_path):
        print("❌ Folder not found!")
        return
    
    processed = 0
    errors = 0
    
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(supported_formats):
            file_path = os.path.join(folder_path, filename)
            
            try:
                # Open image
                img = Image.open(file_path)
                
                # Get original size
                original_size = os.path.getsize(file_path) / 1024  # KB
                
                # Convert RGBA to RGB if needed
                if img.mode in ('RGBA', 'LA', 'P'):
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    img = background
                
                # Resize to 600x600 (maintain aspect ratio)
                img.thumbnail((600, 600), Image.Resampling.LANCZOS)
                
                # Generate new filename (same name but .webp)
                name_without_ext = os.path.splitext(filename)[0]
                new_filename = f"{name_without_ext}.webp"
                new_file_path = os.path.join(folder_path, new_filename)
                
                # Save as WebP
                img.save(new_file_path, 'WEBP', quality=quality, optimize=True)
                
                # Get new size
                new_size = os.path.getsize(new_file_path) / 1024  # KB
                
                # Delete original if it's not already a .webp
                if file_path != new_file_path:
                    os.remove(file_path)
                
                # Calculate compression
                reduction = ((original_size - new_size) / original_size) * 100
                
                print(f"✅ {filename}")
                print(f"   Original: {original_size:.1f}KB → Compressed: {new_size:.1f}KB ({reduction:.1f}% reduction)")
                print(f"   Saved as: {new_filename}\n")
                
                processed += 1
                
            except Exception as e:
                print(f"❌ Error processing {filename}: {str(e)}\n")
                errors += 1
    
    print("=" * 60)
    print(f"🎉 COMPRESSION COMPLETE!")
    print(f"✅ Processed: {processed} images")
    if errors > 0:
        print(f"❌ Errors: {errors} images")
    print("=" * 60)

if __name__ == "__main__":
    print("""
    ╔════════════════════════════════════════╗
    ║  🔥 BULK IMAGE COMPRESSOR TO WEBP     ║
    ║  600x600 | Quality 75 | Same Names    ║
    ╚════════════════════════════════════════╝
    """)
    
    if len(sys.argv) > 1:
        folder = sys.argv[1]
    else:
        folder = input("📁 Enter folder path (or press Enter for current folder): ").strip()
        if not folder:
            folder = "."
    
    quality = input("🎨 Enter quality (1-100, press Enter for 75): ").strip()
    quality = int(quality) if quality else 75
    
    compress_images(folder, quality)
    input("\nPress Enter to exit...")