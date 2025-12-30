const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DOCS_DIR = path.join(__dirname, '../docs');
const I18N_ES_DOCS_DIR = path.join(__dirname, '../i18n/es/docusaurus-plugin-content-docs/current');

function getFileHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return crypto.createHash('md5').update(content).digest('hex');
}

function copyMarkdownFiles() {
  // Ensure target directory exists
  if (!fs.existsSync(I18N_ES_DOCS_DIR)) {
    fs.mkdirSync(I18N_ES_DOCS_DIR, { recursive: true });
  }

  // Read all markdown files from docs
  const files = fs.readdirSync(DOCS_DIR);
  const markdownFiles = files.filter(file => file.endsWith('.md'));

  let copiedCount = 0;
  let skippedCount = 0;

  // Copy each file to Spanish directory
  markdownFiles.forEach(file => {
    const sourcePath = path.join(DOCS_DIR, file);
    const targetPath = path.join(I18N_ES_DOCS_DIR, file);
    
    const sourceHash = getFileHash(sourcePath);
    
    // Check if target exists and has been manually translated
    if (fs.existsSync(targetPath)) {
      const targetHash = getFileHash(targetPath);
      
      // If hashes differ, warn user about potential overwrite
      if (targetHash !== sourceHash) {
        console.warn(`⚠️  WARNING: ${file} has been modified in Spanish directory`);
        console.warn(`   English hash: ${sourceHash}`);
        console.warn(`   Spanish hash: ${targetHash}`);
        console.warn(`   This file may contain manual Spanish translations.`);
        console.warn(`   Skipping copy to preserve translations.\n`);
        skippedCount++;
        return;
      }
    }
    
    fs.copyFileSync(sourcePath, targetPath);
    copiedCount++;
    console.log(`✓ Copied: ${file}`);
  });

  console.log(`\n✓ Successfully copied ${copiedCount} files to Spanish directory`);
  if (skippedCount > 0) {
    console.log(`⚠️  Skipped ${skippedCount} files (manually translated)`);
  }
}

copyMarkdownFiles();
