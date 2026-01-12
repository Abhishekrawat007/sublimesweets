#!/usr/bin/env python3
import os
import glob
from datetime import datetime

def get_html_files():
    """Scan current directory for HTML files"""
    html_files = glob.glob("*.html")
    return sorted(html_files)

def show_checklist(files):
    """Show interactive checklist and get user selection"""
    print("\n" + "="*60)
    print("📄 HTML Files Found:")
    print("="*60)
    
    for i, file in enumerate(files, 1):
        print(f"{i}. [ ] {file}")
    
    print("\n" + "="*60)
    print("Enter numbers to include (e.g., 1 2 3 or 1-5 or 'all'):")
    print("="*60)
    
    selection = input("\nYour selection: ").strip().lower()
    
    if selection == 'all':
        return files
    
    selected_indices = set()
    
    # Parse input
    parts = selection.split()
    for part in parts:
        if '-' in part:
            # Range like 1-5
            try:
                start, end = map(int, part.split('-'))
                selected_indices.update(range(start-1, end))
            except:
                pass
        else:
            # Single number
            try:
                selected_indices.add(int(part)-1)
            except:
                pass
    
    # Get selected files
    selected_files = [files[i] for i in selected_indices if 0 <= i < len(files)]
    return selected_files

def generate_sitemap(base_url, files):
    """Generate sitemap.xml content"""
    # Remove trailing slash
    base_url = base_url.rstrip('/')
    
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for file in files:
        xml += '  <url>\n'
        if file == 'index.html':
            xml += f'    <loc>{base_url}/</loc>\n'
        else:
            xml += f'    <loc>{base_url}/{file}</loc>\n'
        xml += '  </url>\n'
    
    xml += '</urlset>'
    
    return xml

def main():
    print("\n🗺️  SITEMAP GENERATOR")
    print("="*60)
    
    # Scan for HTML files
    html_files = get_html_files()
    
    if not html_files:
        print("❌ No HTML files found in current directory!")
        return
    
    print(f"\n✅ Found {len(html_files)} HTML files")
    
    # Get website URL
    print("\n" + "="*60)
    website_url = input("Enter website URL (e.g., https://sublimestore.in): ").strip()
    
    if not website_url:
        print("❌ Website URL is required!")
        return
    
    # Show checklist and get selection
    selected_files = show_checklist(html_files)
    
    if not selected_files:
        print("\n❌ No files selected!")
        return
    
    # Generate sitemap
    print("\n" + "="*60)
    print(f"✅ Selected {len(selected_files)} files:")
    for file in selected_files:
        print(f"   • {file}")
    
    sitemap_content = generate_sitemap(website_url, selected_files)
    
    # Write to file
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
    
    print("\n" + "="*60)
    print("✅ sitemap.xml generated successfully!")
    print("="*60)
    print("\nPreview:")
    print(sitemap_content)

if __name__ == "__main__":
    main()