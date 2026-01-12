#!/usr/bin/env python3

def main():
    print("\n🤖 ROBOTS.TXT GENERATOR")
    print("="*60)
    
    # Get website URL
    website_url = input("\nEnter website URL (e.g., https://sublimestore.in): ").strip()
    
    if not website_url:
        print("❌ Website URL is required!")
        return
    
    # Remove trailing slash
    website_url = website_url.rstrip('/')
    
    print("\n" + "="*60)
    print("Common paths to disallow (enter numbers, space-separated):")
    print("="*60)
    
    disallow_options = [
        "/admin",
        "/admin/*",
        "/checkout",
        "/checkout/*",
        "/cart",
        "/cart/*",
        "/user",
        "/user/*",
        "/account",
        "/account/*",
        "/api",
        "/api/*",
        "/temp",
        "/temp/*",
        "/private",
        "/private/*"
    ]
    
    for i, path in enumerate(disallow_options, 1):
        print(f"{i}. {path}")
    
    print("\n" + "="*60)
    print("Options: Enter numbers (e.g., 1 2 3), 'none', or 'all'")
    print("="*60)
    
    selection = input("\nYour selection: ").strip().lower()
    
    selected_disallows = []
    
    if selection == 'all':
        selected_disallows = disallow_options
    elif selection != 'none':
        parts = selection.split()
        for part in parts:
            try:
                idx = int(part) - 1
                if 0 <= idx < len(disallow_options):
                    selected_disallows.append(disallow_options[idx])
            except:
                pass
    
    # Ask about sitemap
    print("\n" + "="*60)
    has_sitemap = input("Include sitemap.xml? (y/n): ").strip().lower()
    
    # Generate robots.txt
    print("\n" + "="*60)
    print("Generating robots.txt...")
    
    robots_content = "# robots.txt for " + website_url + "\n\n"
    robots_content += "User-agent: *\n"
    
    if selected_disallows:
        for path in selected_disallows:
            robots_content += f"Disallow: {path}\n"
    else:
        robots_content += "Disallow:\n"
    
    robots_content += "\n# Allow all other pages\n"
    robots_content += "Allow: /\n"
    
    if has_sitemap in ['y', 'yes']:
        robots_content += f"\n# Sitemap\n"
        robots_content += f"Sitemap: {website_url}/sitemap.xml\n"
    
    # Write to file
    with open('robots.txt', 'w', encoding='utf-8') as f:
        f.write(robots_content)
    
    print("\n" + "="*60)
    print("✅ robots.txt generated successfully!")
    print("="*60)
    print("\nPreview:")
    print(robots_content)
    print("\n" + "="*60)
    print("📤 Upload robots.txt to your website root directory")
    print("🔗 Access at: " + website_url + "/robots.txt")
    print("="*60)

if __name__ == "__main__":
    main()