const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.copyFileSync(source, target)
}

function copyDir(source, target) {
  if (!fs.existsSync(source)) return
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name)
    const to = path.join(target, entry.name)
    if (entry.isDirectory()) {
      copyDir(from, to)
    } else if (entry.isFile()) {
      copyFile(from, to)
    }
  }
}

fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(dist, { recursive: true })

copyFile(path.join(root, 'preview-v3.html'), path.join(dist, 'index.html'))
copyFile(path.join(root, 'preview.html'), path.join(dist, 'preview.html'))
copyFile(path.join(root, 'preview-v2.html'), path.join(dist, 'preview-v2.html'))
copyFile(path.join(root, 'preview-v3.html'), path.join(dist, 'preview-v3.html'))
copyFile(path.join(root, 'PROJECT_SNAPSHOT.html'), path.join(dist, 'PROJECT_SNAPSHOT.html'))
copyDir(path.join(root, 'assets'), path.join(dist, 'assets'))

console.log('GitHub Pages build complete: dist/')
