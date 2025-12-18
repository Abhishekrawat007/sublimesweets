# image_resizer_bot.py

from PIL import Image
import os
from pathlib import Path

class ImageResizerBot:
    """
    Resizes images to exact slideshow dimensions
    Desktop: 1920x1080 | Mobile: 768x1024
    """
    
    DESKTOP_SIZE = (1920, 1080)  # 16:9
    MOBILE_SIZE = (768, 1024)     # 3:4
    
    def __init__(self, input_folder="input_images", output_folder="resized_images"):
        self.input_folder = Path(input_folder)
        self.output_folder = Path(output_folder)
        
        # Create folders if they don't exist
        self.input_folder.mkdir(exist_ok=True)
        self.output_folder.mkdir(exist_ok=True)
        (self.output_folder / "desktop").mkdir(exist_ok=True)
        (self.output_folder / "mobile").mkdir(exist_ok=True)
    
    def resize_image(self, image_path, target_size, output_path):
        """
        Resize image to exact dimensions using smart cropping
        Maintains aspect ratio and crops from center
        """
        try:
            with Image.open(image_path) as img:
                # Convert to RGB if needed (for PNG with transparency)
                if img.mode in ('RGBA', 'LA', 'P'):
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    img = background
                
                # Calculate aspect ratios
                img_ratio = img.width / img.height
                target_ratio = target_size[0] / target_size[1]
                
                # Resize to cover target size (no empty spaces)
                if img_ratio > target_ratio:
                    # Image is wider - fit height
                    new_height = target_size[1]
                    new_width = int(new_height * img_ratio)
                else:
                    # Image is taller - fit width
                    new_width = target_size[0]
                    new_height = int(new_width / img_ratio)
                
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # Crop from center to exact size
                left = (new_width - target_size[0]) // 2
                top = (new_height - target_size[1]) // 2
                right = left + target_size[0]
                bottom = top + target_size[1]
                
                img = img.crop((left, top, right, bottom))
                
                # Save with high quality
                img.save(output_path, 'JPEG', quality=95, optimize=True)
                return True
                
        except Exception as e:
            print(f"❌ Error processing {image_path.name}: {e}")
            return False
    
    def process_all_images(self):
        """Process all images in input folder"""
        
        # Get all image files
        image_extensions = {'.jpg', '.jpeg', '.png', '.webp', '.bmp'}
        image_files = [f for f in self.input_folder.iterdir() 
                      if f.suffix.lower() in image_extensions]
        
        if not image_files:
            print(f"❌ No images found in '{self.input_folder}' folder!")
            print(f"   Please add images to process.")
            return
        
        print(f"\n🎨 Found {len(image_files)} images to process\n")
        print("=" * 50)
        
        success_count = 0
        
        for idx, image_file in enumerate(image_files, 1):
            base_name = image_file.stem
            print(f"\n📸 Processing [{idx}/{len(image_files)}]: {image_file.name}")
            
            # Desktop version
            desktop_output = self.output_folder / "desktop" / f"{base_name}_desktop.jpg"
            if self.resize_image(image_file, self.DESKTOP_SIZE, desktop_output):
                print(f"   ✅ Desktop (1920x1080) → {desktop_output.name}")
            
            # Mobile version
            mobile_output = self.output_folder / "mobile" / f"{base_name}_mobile.jpg"
            if self.resize_image(image_file, self.MOBILE_SIZE, mobile_output):
                print(f"   ✅ Mobile (768x1024) → {mobile_output.name}")
                success_count += 1
        
        print("\n" + "=" * 50)
        print(f"✨ Complete! Processed {success_count}/{len(image_files)} images")
        print(f"\n📁 Output folders:")
        print(f"   Desktop: {self.output_folder / 'desktop'}")
        print(f"   Mobile:  {self.output_folder / 'mobile'}")


def main():
    print("\n" + "=" * 50)
    print("🎨 SLIDESHOW IMAGE RESIZER BOT")
    print("=" * 50)
    print("Desktop: 1920x1080 | Mobile: 768x1024")
    print("=" * 50 + "\n")
    
    bot = ImageResizerBot()
    bot.process_all_images()
    
    print("\n✨ All done! Upload to Cloudinary or use directly.\n")


if __name__ == "__main__":
    main()