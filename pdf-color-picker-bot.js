// pdf-color-picker-bot.js
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

// Color scheme definitions
const colorSchemes = {
  1: {
    name: "Royal Purple & Gold (Luxury Jewelry)",
    colors: {
      background: [250, 245, 255],
      header: [102, 45, 145],
      accent: [255, 215, 0],
      headerText: [255, 255, 255],
      tableHeader: [102, 45, 145],
      totalAmount: [102, 45, 145],
      footer: [75, 0, 130],
      alternateRow: [255, 248, 240]
    }
  },
  2: {
    name: "Emerald Green & Silver (Organic/Eco)",
    colors: {
      background: [245, 255, 250],
      header: [16, 124, 16],
      accent: [192, 192, 192],
      headerText: [255, 255, 255],
      tableHeader: [16, 124, 16],
      totalAmount: [16, 124, 16],
      footer: [0, 100, 0],
      alternateRow: [240, 255, 250]
    }
  },
  3: {
    name: "Navy Blue & Platinum (Corporate)",
    colors: {
      background: [240, 245, 255],
      header: [0, 31, 63],
      accent: [229, 228, 226],
      headerText: [255, 255, 255],
      tableHeader: [0, 31, 63],
      totalAmount: [0, 31, 63],
      footer: [25, 25, 112],
      alternateRow: [255, 248, 240]
    }
  },
  4: {
    name: "Rose Gold & Blush (Beauty/Cosmetics)",
    colors: {
      background: [255, 245, 250],
      header: [183, 110, 121],
      accent: [255, 192, 203],
      headerText: [255, 255, 255],
      tableHeader: [183, 110, 121],
      totalAmount: [183, 110, 121],
      footer: [139, 69, 85],
      alternateRow: [255, 248, 240]
    }
  },
  5: {
    name: "Black & Gold (Ultra Luxury)",
    colors: {
      background: [250, 250, 250],
      header: [0, 0, 0],
      accent: [255, 215, 0],
      headerText: [255, 255, 255],
      tableHeader: [0, 0, 0],
      totalAmount: [218, 165, 32],
      footer: [0, 0, 0],
      alternateRow: [245, 245, 245]
    }
  },
  6: {
    name: "Teal & Coral (Modern/Trendy)",
    colors: {
      background: [240, 255, 255],
      header: [0, 128, 128],
      accent: [255, 127, 80],
      headerText: [255, 255, 255],
      tableHeader: [0, 128, 128],
      totalAmount: [0, 128, 128],
      footer: [0, 100, 100],
      alternateRow: [240, 255, 250]
    }
  },
  0: {
    name: "Original Orange & Gold (Sweets/Mithai)",
    colors: {
      background: [255, 250, 240],
      header: [255, 140, 0],
      accent: [255, 215, 0],
      headerText: [255, 255, 255],
      tableHeader: [255, 140, 0],
      totalAmount: [255, 140, 0],
      footer: [139, 69, 19],
      alternateRow: [255, 248, 240]
    }
  }
};

function applyColorScheme(content, scheme) {
  const c = scheme.colors;
  
  // Replace background color
  content = content.replace(
    /pdf\.setFillColor\(255,\s*250,\s*240\);\s*\/\/\s*Very light cream/,
    `pdf.setFillColor(${c.background[0]}, ${c.background[1]}, ${c.background[2]}); // ${scheme.name} background`
  );
  
  // Replace header bar color
  content = content.replace(
    /pdf\.setFillColor\(255,\s*140,\s*0\);\s*\/\/\s*Orange/,
    `pdf.setFillColor(${c.header[0]}, ${c.header[1]}, ${c.header[2]}); // ${scheme.name} header`
  );
  
  // Replace accent line color
  content = content.replace(
    /pdf\.setDrawColor\(255,\s*215,\s*0\);\s*\/\/\s*Gold/g,
    `pdf.setDrawColor(${c.accent[0]}, ${c.accent[1]}, ${c.accent[2]}); // ${scheme.name} accent`
  );
  
  // Replace table header fillColor
  content = content.replace(
    /fillColor:\s*\[255,\s*140,\s*0\],\s*\/\/\s*ORANGE HEADER/,
    `fillColor: [${c.tableHeader[0]}, ${c.tableHeader[1]}, ${c.tableHeader[2]}], // ${scheme.name} table header`
  );
  
  // Replace total amount color
  content = content.replace(
    /textColor:\s*\[255,\s*140,\s*0\]\s*}\s*}\s*\]\);/,
    `textColor: [${c.totalAmount[0]}, ${c.totalAmount[1]}, ${c.totalAmount[2]}] } }\n    ]);`
  );
  
  // Replace footer text color
  content = content.replace(
    /pdf\.setTextColor\(139,\s*69,\s*19\);\s*\/\/\s*Brown for elegance/,
    `pdf.setTextColor(${c.footer[0]}, ${c.footer[1]}, ${c.footer[2]}); // ${scheme.name} footer`
  );
  
  // Replace alternate row color
  content = content.replace(
    /fillColor:\s*\[255,\s*248,\s*240\]\s*\/\/\s*Light cream for alternate rows/,
    `fillColor: [${c.alternateRow[0]}, ${c.alternateRow[1]}, ${c.alternateRow[2]}] // ${scheme.name} alternate rows`
  );
  
  return content;
}

async function main() {
  console.log('🎨 PDF Color Picker Bot\n');
  
  // Show available color schemes
  console.log('Available Color Schemes:');
  console.log('0. Original Orange & Gold (Sweets/Mithai)');
  console.log('1. Royal Purple & Gold (Luxury Jewelry)');
  console.log('2. Emerald Green & Silver (Organic/Eco)');
  console.log('3. Navy Blue & Platinum (Corporate)');
  console.log('4. Rose Gold & Blush (Beauty/Cosmetics)');
  console.log('5. Black & Gold (Ultra Luxury)');
  console.log('6. Teal & Coral (Modern/Trendy)\n');
  
  // Get user choice
  const choice = await question('Choose color scheme (0-6): ');
  const schemeNum = parseInt(choice);
  
  if (isNaN(schemeNum) || schemeNum < 0 || schemeNum > 6) {
    console.log('❌ Invalid choice! Must be 0-6');
    rl.close();
    return;
  }
  
  rl.close();
  
  const scheme = colorSchemes[schemeNum];
  console.log(`\n🎨 Selected: ${scheme.name}\n`);
  
  // File paths
  const inputFile = path.join(__dirname, 'netlify', 'functions', 'sendTelegramOrder.js');
  const outputDir = path.join(__dirname, 'bot', 'netlify', 'functions');
  const outputFile = path.join(outputDir, 'sendTelegramOrder.js');
  
  // Check if input file exists
  if (!fs.existsSync(inputFile)) {
    console.log('❌ File not found: netlify/functions/sendTelegramOrder.js');
    console.log('Make sure File 4 or File 5 is in netlify/functions/ first!');
    return;
  }
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Read file
  let content = fs.readFileSync(inputFile, 'utf8');
  
  // Apply color scheme
  content = applyColorScheme(content, scheme);
  
  // Save to bot folder
  fs.writeFileSync(outputFile, content, 'utf8');
  
  console.log(`✅ Color scheme applied: ${scheme.name}`);
  console.log(`📁 Saved to: bot/netlify/functions/sendTelegramOrder.js`);
  console.log('\n⚠️  Review the file before copying to production!');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  rl.close();
});