const path = require('path')
const fs = require('fs')

// 将源文件夹下的所有文件复制到目标文件夹，并将文件内容压缩为一行
function copyAndCompressDirectory(srcPath, distPath) {
  // 如果目标文件夹不存在，则创建它
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath)
  }

  // 遍历源文件夹下的所有文件和子文件夹
  fs.readdirSync(srcPath).forEach((file) => {
    const filePath = path.join(srcPath, file)
    const distFilePath = path.join(distPath, file)

    if (fs.statSync(filePath).isDirectory()) {
      // 如果当前是一个文件夹，则递归调用自身
      copyAndCompressDirectory(filePath, distFilePath)
    } else {
      // 如果当前是一个文件，则进行复制和压缩操作
      let content = fs.readFileSync(filePath, 'utf-8').replace(/\/\/[^\r\n]*/g, '')
      content = content.replace(/[\r\n\s]+/g, '')
      fs.writeFileSync(distFilePath, content)
    }
  })
}

copyAndCompressDirectory('./packages/global-css-files/style', './dist/global-css-files/dist')

const move = () => {
  const files = [
    {
      input: './packages/global-css-files/package.json',
      outDir: 'dist/global-css-files/package.json'
    }
  ]

  let version = ''

  files.forEach((item, index) => {
    if (index === 0) {
      let content = fs.readFileSync(item.input, 'utf-8')
      content = content.replace(/("version": ")(\d+\.\d+\.)(\d+)/, (str, a, b, c) => {
        version = b + String(Number(c) + 1)
        return a + version
      })
      fs.writeFileSync(item.input, content)
      fs.writeFileSync(item.outDir, content)
    }
  })

  console.warn('\n' + `global-css-files ${version} 版本打包成功` + '\n')
}

move()
