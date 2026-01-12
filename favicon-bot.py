#!/usr/bin/env python3
"""
Favicon Auto-Injector Bot
Adds favicon links AFTER all meta tags (title, description, keywords, viewport, robots)
"""

import os
import re
from pathlib import Path

# Favicon links to inject
FAVICON_LINKS = '''
<!-- Favicon for most browsers -->
<link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="apple-touch-icon.png">

<!-- Android Chrome Icons -->
<link rel="manifest" href="/manifest.json">
<link rel="icon" type="image/png" sizes="72x72" href="web-app-manifest-72x72.png">
<link rel="icon" type="image/png" sizes="144x144" href="web-app-manifest-144x144.png">
<link rel="icon" type="image/png" sizes="192x192" href="web-app-manifest-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="web-app-manifest-512x512.png">
'''

def remove_existing_favicons(html_content):
    """Remove all existing favicon links"""
    # Remove favicon comments
    html_content = re.sub(r'<!--\s*Favicon.*?-->', '', html_content, flags=re.IGNORECASE | re.DOTALL)
    html_content = re.sub(r'<!--\s*Apple Touch.*?-->', '', html_content, flags=re.IGNORECASE | re.DOTALL)
    html_content = re.sub(r'<!--\s*Android.*?-->', '', html_content, flags=re.IGNORECASE | re.DOTALL)
    
    # Remove favicon links
    html_content = re.sub(r'<link[^>]*rel=["\']icon["\'][^>]*/?>', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'<link[^>]*rel=["\']shortcut icon["\'][^>]*/?>', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'<link[^>]*rel=["\']apple-touch-icon["\'][^>]*/?>', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'<link[^>]*rel=["\']manifest["\'][^>]*/?>', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'<link[^>]*favicon[^>]*/?>', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'<link[^>]*web-app-manifest[^>]*/?>', '', html_content, flags=re.IGNORECASE)
    
    return html_content

def inject_favicons(html_content):
    """Inject favicon links AFTER all meta tags in <head>"""
    
    # Find ALL meta tags in head section
    meta_patterns = [
        r'<meta[^>]*>',
        r'<title>.*?</title>'
    ]
    
    # Find the last meta tag or title in the head section
    last_position = -1
    last_match = None
    
    # Search for head opening
    head_match = re.search(r'<head[^>]*>', html_content, re.IGNORECASE)
    if not head_match:
        print("⚠️  Warning: No <head> tag found!")
        return html_content
    
    head_start = head_match.end()
    
    # Find head closing
    head_close_match = re.search(r'</head>', html_content, re.IGNORECASE)
    if not head_close_match:
        print("⚠️  Warning: No </head> tag found!")
        return html_content
    
    head_end = head_close_match.start()
    
    # Get the head section content
    head_section = html_content[head_start:head_end]
    
    # Find all meta tags and title in head section
    for pattern in meta_patterns:
        for match in re.finditer(pattern, head_section, re.IGNORECASE | re.DOTALL):
            if match.end() > last_position:
                last_position = match.end()
                last_match = match
    
    if last_match:
        # Calculate absolute position in the full content
        insert_position = head_start + last_position
        
        # Insert favicon links after the last meta tag
        html_content = (html_content[:insert_position] + 
                       '\n' + FAVICON_LINKS + 
                       html_content[insert_position:])
    else:
        # Fallback: insert right after <head>
        html_content = (html_content[:head_start] + 
                       '\n' + FAVICON_LINKS + 
                       html_content[head_start:])
    
    return html_content

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
    confirm = input("Add favicon links to all these files? (yes/no): ").strip().lower()
    
    if confirm not in ['yes', 'y']:
        print("\n❌ Cancelled!")
        return
    
    print("\n🚀 Processing files...\n")
    
    updated = 0
    for html_file in html_files:
        try:
            # Read file
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove existing favicons
            content = remove_existing_favicons(content)
            
            # Inject new favicon links AFTER all meta tags
            new_content = inject_favicons(content)
            
            # Write back
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✅ Updated: {html_file.name}")
            updated += 1
            
        except Exception as e:
            print(f"❌ Error updating {html_file.name}: {str(e)}")
    
    print("\n" + "="*60)
    print(f"✅ Successfully updated {updated}/{len(html_files)} files!")
    print("="*60 + "\n")

def main():
    """Main function"""
    print("\n" + "="*60)
    print("🤖 FAVICON AUTO-INJECTOR BOT")
    print("="*60)
    
    # Files to exclude
    exclude_files = ['editor.html']
    
    print(f"\n📌 Excluded files: {', '.join(exclude_files)}")
    print("\n⚠️  This will:")
    print("   1. Remove all existing favicon links")
    print("   2. Add new favicon links AFTER all meta tags")
    print("   3. Keep title, description, keywords at the top")
    print("   4. Update all HTML files except excluded ones")
    
    print("\n" + "="*60)
    confirm = input("Continue? (yes/no): ").strip().lower()
    
    if confirm not in ['yes', 'y']:
        print("\n❌ Cancelled!")
        return
    
    # Process files
    current_dir = os.getcwd()
    process_html_files(current_dir, exclude_files)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Cancelled by user!")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")