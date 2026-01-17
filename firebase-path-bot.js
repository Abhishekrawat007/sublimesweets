// firebase-path-bot.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('🤖 Firebase Path Replacer Bot\n');

  // Get site name
  const siteName = await question('Enter site name (e.g., sublimeclothes): ');
  if (!siteName.trim()) {
    console.log('❌ Site name required!');
    rl.close();
    return;
  }

  // Get site type
  const siteType = await question('Site type? (demo/real): ');
  if (!['demo', 'real'].includes(siteType.toLowerCase())) {
    console.log('❌ Type must be "demo" or "real"!');
    rl.close();
    return;
  }

  rl.close();

  const isDemoSite = siteType.toLowerCase() === 'demo';
  
  // Paths
  const inputDir = path.join(__dirname, 'netlify', 'functions');
  const outputDir = path.join(__dirname, 'bot', 'netlify', 'functions');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read all files
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.js'));

  console.log(`\n📂 Found ${files.length} files in netlify/functions/`);
  console.log(`🎯 Mode: ${isDemoSite ? 'DEMO' : 'REAL CLIENT'}`);
  console.log(`📍 New path: ${isDemoSite ? `sites/${siteName}/` : '/'}\n`);

  let processedCount = 0;

  files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    let content = fs.readFileSync(inputPath, 'utf8');

    if (isDemoSite) {
      // Demo: Replace sites/sublimesweets/ with sites/{siteName}/
      content = content.replace(/sites\/sublimesweets\//g, `sites/${siteName}/`);
    } else {
      // Real: Remove sites/sublimesweets/ prefix (becomes /)
      content = content.replace(/sites\/sublimesweets\//g, '');
    }

    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`✅ ${file}`);
    processedCount++;
  });

  console.log(`\n🎉 Done! Processed ${processedCount} files`);
  console.log(`📁 Output: bot/netlify/functions/`);
  console.log(`\n⚠️  Review files before copying to production!`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  rl.close();
});