import os
import re
from pathlib import Path

class SmartComponentInjector:
    def __init__(self):
        # Component flags
        self.update_navbar = False
        self.update_bottombar = False
        self.update_footer = False
        
        # Navbar
        self.navbar_html = ""
        self.navbar_css = ""
        self.navbar_js = ""
        
        # Bottom-bar
        self.bottombar_html = ""
        self.bottombar_css = ""
        self.bottombar_js = ""
        
        # Footer
        self.footer_html = ""
        self.footer_css = ""
        self.footer_js = ""
        
        # Nav-sync
        self.nav_sync_js = ""
        
        self.project_folder = ""
        self.html_files = []
        
    def load_files(self):
        """Load component files based on user choice"""
        print("\n=== SMART COMPONENT INJECTOR ===\n")
        
        # Ask for navbar
        navbar_choice = input("🔹 Do you want to update NAVBAR? (y/n): ").strip().lower()
        if navbar_choice == 'y':
            self.update_navbar = True
            print("\n📁 Enter navbar.html file path:")
            navbar_html_path = input().strip()
            with open(navbar_html_path, 'r', encoding='utf-8') as f:
                self.navbar_html = f.read()
            
            print("📁 Enter navbar.css file name (e.g., navbar.css):")
            self.navbar_css = input().strip()
            
            print("📁 Enter navbar.js file name (e.g., navbar.js):")
            self.navbar_js = input().strip()
        
        # Ask for bottom-bar
        bottombar_choice = input("\n🔹 Do you want to update BOTTOM-BAR? (y/n): ").strip().lower()
        if bottombar_choice == 'y':
            self.update_bottombar = True
            print("\n📁 Enter bottom-bar.html file path:")
            bottombar_html_path = input().strip()
            with open(bottombar_html_path, 'r', encoding='utf-8') as f:
                self.bottombar_html = f.read()
            
            print("📁 Enter bottom-bar.css file name (e.g., bottom-bar.css):")
            self.bottombar_css = input().strip()
            
            print("📁 Enter bottom-bar.js file name (e.g., bottom-bar.js):")
            self.bottombar_js = input().strip()
        
        # Ask for footer
        footer_choice = input("\n🔹 Do you want to update FOOTER? (y/n): ").strip().lower()
        if footer_choice == 'y':
            self.update_footer = True
            print("\n📁 Enter footer.html file path:")
            footer_html_path = input().strip()
            with open(footer_html_path, 'r', encoding='utf-8') as f:
                self.footer_html = f.read()
            
            print("📁 Enter footer.css file name (e.g., footer.css):")
            self.footer_css = input().strip()
            
            print("📁 Enter footer.js file name (e.g., footer.js):")
            self.footer_js = input().strip()
        
        # Ask for nav-sync (if navbar or bottom-bar enabled)
        if self.update_navbar or self.update_bottombar:
            navsync_choice = input("\n🔹 Do you want to update NAV-SYNC.JS? (y/n): ").strip().lower()
            if navsync_choice == 'y':
                print("📁 Enter nav-sync.js file name (e.g., nav-sync.js):")
                self.nav_sync_js = input().strip()
        
        print("\n✅ Configuration loaded successfully!")
        
    def scan_html_files(self):
        """Scan project folder for HTML files"""
        print("\n📂 Enter your project folder path:")
        self.project_folder = input().strip()
        
        # Find all HTML files
        self.html_files = []
        for root, dirs, files in os.walk(self.project_folder):
            for file in files:
                if file.endswith('.html'):
                    relative_path = os.path.relpath(os.path.join(root, file), self.project_folder)
                    self.html_files.append(relative_path)
        
        if not self.html_files:
            print("❌ No HTML files found in the folder!")
            return False
        
        print(f"\n✅ Found {len(self.html_files)} HTML files")
        return True
    
    def select_files(self):
        """Let user select which files to inject"""
        import inquirer
        
        questions = [
            inquirer.Checkbox('files',
                             message="Select files to inject (use spacebar to check, enter to confirm)",
                             choices=self.html_files,
                             )
        ]
        
        answers = inquirer.prompt(questions)
        return answers['files'] if answers else []
    
    def find_css_link_section(self, html_content):
        """Find the end position of consecutive CSS link tags"""
        # Pattern to find consecutive link tags
        link_pattern = r'(<link[^>]*rel=["\']stylesheet["\'][^>]*>\s*)+'
        match = re.search(link_pattern, html_content, re.IGNORECASE)
        
        if match:
            return match.end()
        return None
    
    def find_js_script_section(self, html_content):
        """Find the end position of consecutive JS script tags with js/ path"""
        # Pattern to find consecutive script tags with js/ paths
        script_pattern = r'(\s*<script[^>]*src=["\']js/[^"\']+\.js["\'][^>]*></script>\s*)+'
        match = re.search(script_pattern, html_content, re.IGNORECASE)
        
        if match:
            return match.end()
        return None
    
    def replace_html_at_position(self, html_content, marker_start, marker_end, new_html):
        """Replace HTML content between markers with new HTML"""
        pattern = f'{re.escape(marker_start)}.*?{re.escape(marker_end)}'
        replacement = f'{marker_start}\n{new_html}\n{marker_end}'
        return re.sub(pattern, replacement, html_content, flags=re.DOTALL)
    
    def inject_components(self, html_content):
        """Inject only enabled and missing components"""
        
        # ===========================================
        # NAVBAR HANDLING
        # ===========================================
        if self.update_navbar:
            # Check if navbar CSS exists
            has_navbar_css = f'href="css/{self.navbar_css}"' in html_content
            if not has_navbar_css:
                # Find CSS link section
                css_pos = self.find_css_link_section(html_content)
                navbar_css_link = f'\n    <link rel="stylesheet" href="css/{self.navbar_css}">'
                
                if css_pos:
                    # Add after existing CSS links
                    html_content = html_content[:css_pos] + navbar_css_link + html_content[css_pos:]
                elif '</head>' in html_content:
                    # Fallback: add before </head>
                    html_content = html_content.replace('</head>', f'{navbar_css_link}\n</head>', 1)
            
            # Check if navbar HTML exists
            has_navbar_html = '<!-- NAVBAR START -->' in html_content
            if has_navbar_html:
                # Replace at exact position
                html_content = self.replace_html_at_position(
                    html_content, 
                    '<!-- NAVBAR START -->', 
                    '<!-- NAVBAR END -->', 
                    self.navbar_html
                )
            else:
                # Add new navbar
                navbar_with_comments = f'\n<!-- NAVBAR START -->\n{self.navbar_html}\n<!-- NAVBAR END -->\n'
                if '<body>' in html_content:
                    html_content = html_content.replace('<body>', f'<body>{navbar_with_comments}', 1)
                elif re.search(r'<body[^>]*>', html_content):
                    html_content = re.sub(r'(<body[^>]*>)', rf'\1{navbar_with_comments}', html_content, count=1)
            
            # Check if navbar JS exists
            has_navbar_js = f'src="js/{self.navbar_js}"' in html_content
            if not has_navbar_js:
                # Will be added in JS section below
                pass
        
        # ===========================================
        # BOTTOM-BAR HANDLING
        # ===========================================
        if self.update_bottombar:
            # Check if bottom-bar CSS exists
            has_bottombar_css = f'href="css/{self.bottombar_css}"' in html_content
            if not has_bottombar_css:
                # Find CSS link section
                css_pos = self.find_css_link_section(html_content)
                bottombar_css_link = f'\n    <link rel="stylesheet" href="css/{self.bottombar_css}">'
                
                if css_pos:
                    # Add after existing CSS links
                    html_content = html_content[:css_pos] + bottombar_css_link + html_content[css_pos:]
                elif '</head>' in html_content:
                    # Fallback: add before </head>
                    html_content = html_content.replace('</head>', f'{bottombar_css_link}\n</head>', 1)
            
            # Check if bottom-bar HTML exists
            has_bottombar_html = '<!-- BOTTOM-BAR START -->' in html_content
            if has_bottombar_html:
                # Replace at exact position
                html_content = self.replace_html_at_position(
                    html_content, 
                    '<!-- BOTTOM-BAR START -->', 
                    '<!-- BOTTOM-BAR END -->', 
                    self.bottombar_html
                )
            else:
                # Add new bottom-bar
                bottombar_with_comments = f'\n<!-- BOTTOM-BAR START -->\n{self.bottombar_html}\n<!-- BOTTOM-BAR END -->\n'
                
                # Find product scripts section
                js_pos = self.find_js_script_section(html_content)
                
                if js_pos:
                    # Find start of script section (go backwards to find beginning)
                    script_pattern = r'(\s*<script[^>]*src=["\']js/[^"\']+\.js["\'][^>]*></script>\s*)+'
                    match = re.search(script_pattern, html_content, re.IGNORECASE)
                    if match:
                        insert_pos = match.start()
                        html_content = html_content[:insert_pos] + bottombar_with_comments + html_content[insert_pos:]
                else:
                    # No product scripts, put before </body>
                    if '</body>' in html_content:
                        html_content = html_content.replace('</body>', f'{bottombar_with_comments}\n</body>', 1)
        
        # ===========================================
        # FOOTER HANDLING
        # ===========================================
        if self.update_footer:
            # Check if footer CSS exists
            has_footer_css = f'href="css/{self.footer_css}"' in html_content
            if not has_footer_css:
                # Find CSS link section
                css_pos = self.find_css_link_section(html_content)
                footer_css_link = f'\n    <link rel="stylesheet" href="css/{self.footer_css}">'
                
                if css_pos:
                    # Add after existing CSS links
                    html_content = html_content[:css_pos] + footer_css_link + html_content[css_pos:]
                elif '</head>' in html_content:
                    # Fallback: add before </head>
                    html_content = html_content.replace('</head>', f'{footer_css_link}\n</head>', 1)
            
            # Check if footer HTML exists
            has_footer_html = '<!-- FOOTER START -->' in html_content
            if has_footer_html:
                # Replace at exact position
                html_content = self.replace_html_at_position(
                    html_content, 
                    '<!-- FOOTER START -->', 
                    '<!-- FOOTER END -->', 
                    self.footer_html
                )
            else:
                # Add new footer (after bottom-bar if exists, otherwise before </body>)
                footer_with_comments = f'\n<!-- FOOTER START -->\n{self.footer_html}\n<!-- FOOTER END -->\n'
                
                # Check if bottom-bar exists
                if '<!-- BOTTOM-BAR END -->' in html_content:
                    # Add after bottom-bar
                    html_content = html_content.replace('<!-- BOTTOM-BAR END -->', f'<!-- BOTTOM-BAR END -->{footer_with_comments}', 1)
                else:
                    # Add before </body>
                    if '</body>' in html_content:
                        html_content = html_content.replace('</body>', f'{footer_with_comments}\n</body>', 1)
        
        # ===========================================
        # JS FILES HANDLING (Add all missing JS at once)
        # ===========================================
        js_to_add = []
        
        # Navbar JS
        if self.update_navbar and self.navbar_js:
            if f'src="js/{self.navbar_js}"' not in html_content:
                js_to_add.append(f'    <script src="js/{self.navbar_js}"></script>')
        
        # Bottom-bar JS
        if self.update_bottombar and self.bottombar_js:
            if f'src="js/{self.bottombar_js}"' not in html_content:
                js_to_add.append(f'    <script src="js/{self.bottombar_js}"></script>')
        
        # Nav-sync JS
        if self.nav_sync_js:
            if f'src="js/{self.nav_sync_js}"' not in html_content:
                js_to_add.append(f'    <script src="js/{self.nav_sync_js}"></script>')
        
        # Footer JS
        if self.update_footer and self.footer_js:
            if f'src="js/{self.footer_js}"' not in html_content:
                js_to_add.append(f'    <script src="js/{self.footer_js}"></script>')
        
        # Add all missing JS files
        if js_to_add:
            js_pos = self.find_js_script_section(html_content)
            js_scripts = '\n' + '\n'.join(js_to_add) + '\n'
            
            if js_pos:
                # Add after existing JS scripts
                html_content = html_content[:js_pos] + js_scripts + html_content[js_pos:]
            else:
                # Fallback: add before </body>
                if '</body>' in html_content:
                    html_content = html_content.replace('</body>', f'{js_scripts}</body>', 1)
        
        return html_content

    def process_file(self, file_path):
        """Process single HTML file"""
        full_path = os.path.join(self.project_folder, file_path)
        
        try:
            # Read file
            with open(full_path, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            # Inject components
            html_content = self.inject_components(html_content)
            
            # Write back
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            # Determine status for display
            status_parts = []
            if self.update_navbar:
                status_parts.append("NAV")
            if self.update_bottombar:
                status_parts.append("BOTTOM")
            if self.update_footer:
                status_parts.append("FOOTER")
            
            status = "✅ UPDATED: " + "+".join(status_parts) if status_parts else "✅ PROCESSED"
            print(f"{status} → {file_path}")
            return True
            
        except Exception as e:
            print(f"❌ ERROR → {file_path}: {str(e)}")
            return False
    
    def run(self):
        """Main execution"""
        self.load_files()
        
        # Check if at least one component is enabled
        if not (self.update_navbar or self.update_bottombar or self.update_footer):
            print("\n⚠️  No components selected for update! Exiting...")
            return
        
        if not self.scan_html_files():
            return
        
        selected_files = self.select_files()
        
        if not selected_files:
            print("❌ No files selected!")
            return
        
        print(f"\n=== PROCESSING {len(selected_files)} FILES ===\n")
        
        success_count = 0
        for file in selected_files:
            if self.process_file(file):
                success_count += 1
        
        print(f"\n✅ SUCCESS: {success_count}/{len(selected_files)} files processed")
        print(f"\n💡 Make sure your CSS files are in: {self.project_folder}css/")
        print(f"💡 Make sure your JS files are in: {self.project_folder}js/")

# Run the bot
if __name__ == "__main__":
    bot = SmartComponentInjector()
    bot.run()