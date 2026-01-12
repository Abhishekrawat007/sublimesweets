#!/usr/bin/env python3
"""
Meta Tags Organizer Bot - NO GAPS VERSION
Works with or without robots/canonical tags
"""

import os
import re
from pathlib import Path

def organize_meta_tags(html_content):
    """Organize meta tags in correct order with NO gaps"""
    
    # Find the <head> section
    head_match = re.search(r'<head[^>]*>(.*?)</head>', html_content, re.IGNORECASE | re.DOTALL)
    if not head_match:
        return html_content
    
    head_start = head_match.start()
    head_end = head_match.end()
    head_content = head_match.group(1)
    
    # Store original head content for restoration of other tags
    original_head = head_content
    
    # Extract charset (keep at top)
    charset_match = re.search(r'<meta\s+charset=["\'][^"\']*["\']\s*/?>', head_content, re.IGNORECASE)
    charset_tag = charset_match.group(0) if charset_match else None
    
    # Extract title
    title_match = re.search(r'<title>.*?</title>', head_content, re.IGNORECASE | re.DOTALL)
    title_tag = title_match.group(0) if title_match else None
    
    # Extract description
    desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'][^"\']*["\']\s*/?>', head_content, re.IGNORECASE)
    desc_tag = desc_match.group(0) if desc_match else None
    
    # Extract keywords
    keywords_match = re.search(r'<meta\s+name=["\']keywords["\']\s+content=["\'][^"\']*["\']\s*/?>', head_content, re.IGNORECASE)
    keywords_tag = keywords_match.group(0) if keywords_match else None
    
    # Extract viewport
    viewport_match = re.search(r'<meta\s+name=["\']viewport["\']\s+content=["\'][^"\']*["\']\s*/?>', head_content, re.IGNORECASE)
    viewport_tag = viewport_match.group(0) if viewport_match else None
    
    # Extract robots (optional)
    robots_match = re.search(r'<meta\s+name=["\']robots["\']\s+content=["\'][^"\']*["\']\s*/?>', head_content, re.IGNORECASE)
    robots_tag = robots_match.group(0) if robots_match else None
    
    # Extract canonical (optional)
    canonical_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'][^"\']*["\']\s*/?>', head_content, re.IGNORECASE)
    canonical_tag = canonical_match.group(0) if canonical_match else None
    
    # Remove extracted tags from head_content
    for match in [charset_match, title_match, desc_match, keywords_match, viewport_match, robots_match, canonical_match]:
        if match:
            pattern = re.escape(match.group(0))
            head_content = re.sub(pattern, '', head_content, count=1)
    
    # Remove extra whitespace/newlines left behind
    head_content = re.sub(r'\n\s*\n', '\n', head_content)
    head_content = head_content.strip()
    
    # Build organized section (in correct order, NO gaps)
    organized = ""
    
    if charset_tag:
        organized += f"  {charset_tag}\n"
    
    if title_tag:
        organized += f"  {title_tag}\n"
    
    if desc_tag:
        organized += f"  {desc_tag}\n"
    
    if keywords_tag:
        organized += f"  {keywords_tag}\n"
    
    if viewport_tag:
        organized += f"  {viewport_tag}\n"
    
    if robots_tag:
        organized += f"  {robots_tag}\n"
    
    if canonical_tag:
        organized += f"  {canonical_tag}\n"
    
    # Add remaining head content (stylesheets, scripts, etc.)
    if head_content.strip():
        organized += head_content
    
    # Rebuild full HTML
    new_html = (html_content[:head_start] + 
               '<head>\n' + organized + '\n</head>' + 
               html_content[head_end:])
    
    return new_html

def process_html_files(directory, exclude_files):
    """Process all HTML files except excluded ones"""
    html_files = [f for f in Path(directory).glob('*.html') 
                  if f.name.lower() not in exclude_files]
    
    if not html_files:
        print("\n❌ No HTML files found!")
        return
    
    print(f"\n📁 Found {len(html_files)} HTML file(s):\n")
    for f in html_files:
        print(f"   • {f.name}")
    
    print("\n" + "="*60)
    confirm = input("Organize meta tags? (yes/no): ").strip().lower()
    
    if confirm not in ['yes', 'y']:
        print("\n❌ Cancelled!")
        return
    
    print("\n🚀 Processing files...\n")
    
    updated = 0
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = organize_meta_tags(content)
            
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✅ Updated: {html_file.name}")
            updated += 1
            
        except Exception as e:
            print(f"❌ Error: {html_file.name} - {str(e)}")
    
    print("\n" + "="*60)
    print(f"✅ Done! Updated {updated}/{len(html_files)} files")
    print("="*60 + "\n")

def main():
    """Main function"""
    print("\n" + "="*60)
    print("🤖 META TAGS ORGANIZER BOT - NO GAPS")
    print("="*60)
    
    exclude_files = ['editor.html']
    
    print(f"\n📌 Excluded: {', '.join(exclude_files)}")
    print("\n✅ Order:")
    print("   1. Charset")
    print("   2. Title")
    print("   3. Description")
    print("   4. Keywords")
    print("   5. Viewport")
    print("   6. Robots (if exists)")
    print("   7. Canonical (if exists)")
    print("\n✅ NO extra gaps between tags")
    
    print("\n" + "="*60)
    confirm = input("Continue? (yes/no): ").strip().lower()
    
    if confirm not in ['yes', 'y']:
        print("\n❌ Cancelled!")
        return
    
    process_html_files(os.getcwd(), exclude_files)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Cancelled!")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")