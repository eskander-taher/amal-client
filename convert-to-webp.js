// convert-to-webp.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = process.argv[2]; // directory name from command line

if (!inputDir) {
  console.error("Usage: node convert-to-webp.js <directory>");
  process.exit(1);
}

// Recursively process all files in directory
async function processDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDir(fullPath); // recurse into subdir
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
        const outputFile = path.join(dir, path.basename(file, ext) + ".webp");

        try {
          await sharp(fullPath)
            .webp({ quality: 80 }) // adjust quality if needed
            .toFile(outputFile);

          fs.unlinkSync(fullPath); // remove original file
          console.log(`Converted & removed: ${file} -> ${path.basename(outputFile)}`);
        } catch (err) {
          console.error(`❌ Failed to convert ${file}:`, err.message);
        }
      }
    }
  }
}

processDir(inputDir)
  .then(() => console.log("✅ Conversion complete"))
  .catch((err) => console.error("Error:", err));
