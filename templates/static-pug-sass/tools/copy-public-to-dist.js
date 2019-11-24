const fs = require('fs-extra');
const path = require('path');

async function copy(src, dest) {
    await fs.ensureDir(dest);
    await fs.copy(src, dest);
    await fs.chmod(dest, '0755');
}

const distDir = path.join(__dirname, '../dist');
const publicDir = path.join(__dirname, '../public');

copy(publicDir, distDir).catch(e => console.error(e));