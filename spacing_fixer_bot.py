#!/usr/bin/env python3
"""
🔧 SPACING FIXER BOT
Standardizes spacing/margins/gaps across ALL variations to match original specs

USAGE:
  python spacing_fixer_bot.py file1.css file2.css file3.css ...

OUTPUT:
  Creates css/fixed/ folder and saves:
  css/fixed/file1.css
  css/fixed/file2.css
  css/fixed/file3.css

WHAT IT FIXES:
  ✅ Section padding: 20px → 15px → 12px → 8px (responsive)
  ✅ Header margin-bottom: 20px → 15px → 12px → 10px
  ✅ Image margin-bottom: 16px → 8px → 6px
  ✅ Card sizes: 180px → 140px → 130px → 120px
  ✅ Track gap: 20px → 15px → 12px
  ✅ Scroll padding: 20px 0 30px → 15px 0 20px → 12px 0 18px
  ✅ See-all margin-top: 10px → 15px → 10px → 8px
"""

import re
import sys
import os
from pathlib import Path

def fix_spacing(css_content):
    """Apply standardized spacing rules to CSS"""
    
    # DESKTOP FIXES
    # Section padding - Main section
    css_content = re.sub(
        r'(\.(?:ice-cream|main-course)-section\s*\{[^}]*padding:\s*)\d+px\s+\d+px\s+\d+px\s+\d+px',
        r'\g<1>20px 20px 40px 20px',
        css_content
    )
    
    # Header margin-bottom (desktop)
    css_content = re.sub(
        r'(\.(?:ice-cream|main-course)-header\s*\{[^}]*margin-bottom:\s*)\d+px',
        r'\g<1>20px',
        css_content
    )
    
    # Image margin-bottom (desktop) - in .product-image-wrapper
    css_content = re.sub(
        r'(\.product-image-wrapper\s*\{[^}]*margin-bottom:\s*)\d+px',
        r'\g<1>16px',
        css_content,
        flags=re.DOTALL
    )
    
    # Scroll padding (desktop)
    css_content = re.sub(
        r'(\.(?:ice-cream|main-course)-scroll\s*\{[^}]*padding:\s*)\d+px\s+\d+\s+\d+px',
        r'\g<1>20px 0 30px',
        css_content
    )
    
    # Track gap (desktop)
    css_content = re.sub(
        r'(\.(?:ice-cream|main-course)-track\s*\{[^}]*gap:\s*)\d+px',
        r'\g<1>20px',
        css_content
    )
    
    # See-all margin-top (desktop)
    css_content = re.sub(
        r'(\.see-all-container\s*\{[^}]*margin-top:\s*)\d+px',
        r'\g<1>10px',
        css_content
    )
    
    # TABLET (768px) FIXES
    tablet_section = re.search(r'@media\s*\(\s*max-width:\s*768px\s*\)\s*\{(.*?)(?=@media|$)', css_content, re.DOTALL)
    if tablet_section:
        tablet_css = tablet_section.group(1)
        
        # Section padding
        tablet_css = re.sub(
            r'(\.(?:ice-cream|main-course)-section\s*\{[^}]*padding:\s*)\d+px\s+\d+px\s+\d+px\s+\d+px',
            r'\g<1>20px 15px 25px 15px',
            tablet_css
        )
        
        # Header margin
        tablet_css = re.sub(
            r'(\.(?:ice-cream|main-course)-header\s*\{[^}]*margin-bottom:\s*)\d+px',
            r'\g<1>15px',
            tablet_css
        )
        
        # Add image wrapper fix if not present
        if 'product-image-wrapper' not in tablet_css:
            # Find card section and add image wrapper rule after it
            card_match = re.search(r'(\.(?:ice-cream|main-course)-card\s*\{[^}]*\})', tablet_css)
            if card_match:
                insert_pos = card_match.end()
                tablet_css = tablet_css[:insert_pos] + '\n    \n    .product-image-wrapper {\n        margin-bottom: 8px;\n    }' + tablet_css[insert_pos:]
        else:
            tablet_css = re.sub(
                r'(\.product-image-wrapper\s*\{[^}]*margin-bottom:\s*)\d+px',
                r'\g<1>8px',
                tablet_css
            )
        
        # Card sizes
        tablet_css = re.sub(
            r'(\.(?:ice-cream|main-course)-card\s*\{[^}]*flex:\s*0\s+0\s+)\d+px',
            r'\g<1>140px',
            tablet_css
        )
        tablet_css = re.sub(
            r'(\.(?:ice-cream|main-course)-card\s*\{[^}]*width:\s*)\d+px',
            r'\g<1>140px',
            tablet_css
        )
        
        # Track gap
        tablet_css = re.sub(
            r'(\.(?:ice-cream|main-course)-track\s*\{[^}]*gap:\s*)\d+px',
            r'\g<1>15px',
            tablet_css
        )
        
        # See-all margin
        tablet_css = re.sub(
            r'(\.(?:ice-cream|main-course)-section\s+)?\.see-all-container\s*\{[^}]*margin-top:\s*\d+px',
            lambda m: m.group(0).replace(re.search(r'margin-top:\s*\d+px', m.group(0)).group(0), 'margin-top: 15px'),
            tablet_css
        )
        
        # Replace in original
        css_content = css_content[:tablet_section.start(1)] + tablet_css + css_content[tablet_section.end(1):]
    
    # MOBILE (480px) FIXES
    mobile_section = re.search(r'@media\s*\(\s*max-width:\s*480px\s*\)\s*\{(.*?)(?=@media|$)', css_content, re.DOTALL)
    if mobile_section:
        mobile_css = mobile_section.group(1)
        
        # Section padding
        mobile_css = re.sub(
            r'(\.(?:ice-cream|main-course)-section\s*\{[^}]*padding:\s*)\d+px\s+\d+px\s+\d+px\s+\d+px',
            r'\g<1>15px 10px 20px 10px',
            mobile_css
        )
        
        # Header margin
        mobile_css = re.sub(
            r'(\.(?:ice-cream|main-course)-header\s*\{[^}]*margin-bottom:\s*)\d+px',
            r'\g<1>12px',
            mobile_css
        )
        
        # Add image wrapper fix if not present
        if 'product-image-wrapper' not in mobile_css:
            card_match = re.search(r'(\.(?:ice-cream|main-course)-card\s*\{[^}]*\})', mobile_css)
            if card_match:
                insert_pos = card_match.end()
                mobile_css = mobile_css[:insert_pos] + '\n    \n    .product-image-wrapper {\n        margin-bottom: 6px;\n    }' + mobile_css[insert_pos:]
        else:
            mobile_css = re.sub(
                r'(\.product-image-wrapper\s*\{[^}]*margin-bottom:\s*)\d+px',
                r'\g<1>6px',
                mobile_css
            )
        
        # Scroll padding
        mobile_css = re.sub(
            r'(\.(?:ice-cream|main-course)-scroll\s*\{[^}]*padding:\s*)\d+px\s+\d+\s+\d+px',
            r'\g<1>15px 0 20px',
            mobile_css
        )
        
        # Card sizes
        mobile_css = re.sub(
            r'(\.(?:ice-cream|main-course)-card\s*\{[^}]*flex:\s*0\s+0\s+)\d+px',
            r'\g<1>130px',
            mobile_css
        )
        mobile_css = re.sub(
            r'(\.(?:ice-cream|main-course)-card\s*\{[^}]*width:\s*)\d+px',
            r'\g<1>130px',
            mobile_css
        )
        
        # Track gap
        mobile_css = re.sub(
            r'(\.(?:ice-cream|main-course)-track\s*\{[^}]*gap:\s*)\d+px',
            r'\g<1>12px',
            mobile_css
        )
        
        # See-all margin
        mobile_css = re.sub(
            r'(\.(?:ice-cream|main-course)-section\s+)?\.see-all-container\s*\{[^}]*margin-top:\s*\d+px',
            lambda m: m.group(0).replace(re.search(r'margin-top:\s*\d+px', m.group(0)).group(0), 'margin-top: 10px'),
            mobile_css
        )
        
        # Replace in original
        css_content = css_content[:mobile_section.start(1)] + mobile_css + css_content[mobile_section.end(1):]
    
    # SMALL MOBILE (360px) FIXES
    small_section = re.search(r'@media\s*\(\s*max-width:\s*360px\s*\)\s*\{(.*?)$', css_content, re.DOTALL)
    if small_section:
        small_css = small_section.group(1)
        
        # Section padding
        small_css = re.sub(
            r'(\.(?:ice-cream|main-course)-section\s*\{[^}]*padding:\s*)\d+px\s+\d+px\s+\d+px\s+\d+px',
            r'\g<1>12px 8px 18px 8px',
            small_css
        )
        
        # Header margin
        small_css = re.sub(
            r'(\.(?:ice-cream|main-course)-header\s*\{[^}]*margin-bottom:\s*)\d+px',
            r'\g<1>10px',
            small_css
        )
        
        # Add image wrapper fix if not present
        if 'product-image-wrapper' not in small_css:
            card_match = re.search(r'(\.(?:ice-cream|main-course)-card\s*\{[^}]*\})', small_css)
            if card_match:
                insert_pos = card_match.end()
                small_css = small_css[:insert_pos] + '\n    \n    .product-image-wrapper {\n        margin-bottom: 6px;\n    }' + small_css[insert_pos:]
        else:
            small_css = re.sub(
                r'(\.product-image-wrapper\s*\{[^}]*margin-bottom:\s*)\d+px',
                r'\g<1>6px',
                small_css
            )
        
        # Scroll padding
        small_css = re.sub(
            r'(\.(?:ice-cream|main-course)-scroll\s*\{[^}]*padding:\s*)\d+px\s+\d+\s+\d+px',
            r'\g<1>12px 0 18px',
            small_css
        )
        
        # Card sizes
        small_css = re.sub(
            r'(\.(?:ice-cream|main-course)-card\s*\{[^}]*flex:\s*0\s+0\s+)\d+px',
            r'\g<1>120px',
            small_css
        )
        small_css = re.sub(
            r'(\.(?:ice-cream|main-course)-card\s*\{[^}]*width:\s*)\d+px',
            r'\g<1>120px',
            small_css
        )
        
        # See-all margin
        small_css = re.sub(
            r'(\.(?:ice-cream|main-course)-section\s+)?\.see-all-container\s*\{[^}]*margin-top:\s*\d+px',
            lambda m: m.group(0).replace(re.search(r'margin-top:\s*\d+px', m.group(0)).group(0), 'margin-top: 8px'),
            small_css
        )
        
        # Replace in original
        css_content = css_content[:small_section.start(1)] + small_css + css_content[small_section.end(1):]
    
    return css_content


def main():
    if len(sys.argv) < 2:
        print("Usage: python spacing_fixer_bot.py file1.css file2.css ...")
        print("\nExample:")
        print("  python spacing_fixer_bot.py variation-1.css variation-2.css")
        print("\nOutput will be saved to: css/fixed/")
        sys.exit(1)
    
    input_files = sys.argv[1:]
    
    # Create css/fixed directory
    fixed_dir = Path("css/fixed")
    fixed_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"🤖 Processing {len(input_files)} file(s)...\n")
    
    for input_file in input_files:
        input_path = Path(input_file)
        
        if not input_path.exists():
            print(f"❌ File not found: {input_file}")
            continue
        
        # Read input
        with open(input_path, 'r', encoding='utf-8') as f:
            css_content = f.read()
        
        # Fix spacing
        fixed_css = fix_spacing(css_content)
        
        # Output to css/fixed/filename.css
        output_path = fixed_dir / input_path.name
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(fixed_css)
        
        print(f"✅ {input_path.name} → {output_path}")
    
    print(f"\n🎉 Done! All files saved to: {fixed_dir}/")
    print("\n📐 Applied fixes:")
    print("  • Section padding: 20px → 15px → 12px")
    print("  • Header margin: 20px → 15px → 12px → 10px")
    print("  • Image gap: 16px → 8px → 6px")
    print("  • Card sizes: 180px → 140px → 130px → 120px")
    print("  • Track gap: 20px → 15px → 12px")


if __name__ == "__main__":
    main()