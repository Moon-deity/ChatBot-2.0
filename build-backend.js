const { build } = require('esbuild');
const { copyFile } = require('fs/promises');
const { join } = require('path');

async function buildBackend() {
    await build({
        entryPoints: ['Backend/server.js'],
        bundle: true,
        platform: 'node',
        target: 'node14',
        outfile: 'dist/server.js',
    });

    // Copy any necessary files (e.g., package.json for dependencies)
    await copyFile(
        join(__dirname, 'Backend', 'package.json'),
        join(__dirname, 'dist', 'package.json')
    );
}

buildBackend().catch(() => process.exit(1));