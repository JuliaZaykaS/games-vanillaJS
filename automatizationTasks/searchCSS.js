const fs = require('fs')
const path = require('path')

// имена папок и расширений
const mainFolder = 'simulator-templates'
const universalFolder = 'universal_templates'
const utcfFolder = 'utcf'
const individFilesFolder = 'individual_files'
const individStylesFolder = 'individual_styles'
const commonFilesFolder = 'common_files'

const cssMain = 'individual_set_styles_standart.css'
const cssModal = 'individual_set_styles_modal.css'

const cssMainMedia = 'individual_set_styles_standartMedia.css'
const cssModalMedia = 'individual_set_styles_modalMedia.css'

const parseDir = path.join(__dirname, '../', mainFolder, universalFolder)
const standFiles = /.*standStyles.*/

const cssDirectory = path.join(
  __dirname,
  '../',
  mainFolder,
  `_${utcfFolder}`,
  utcfFolder,
  individFilesFolder,
  individStylesFolder
)

const cssExclude = [cssModal, cssModalMedia, cssMainMedia, cssMain]

let arr = parseCSSFiles(parseDir)

let mediaQueries = ''
//создаем js файлы с рендер-функциями в указанной папке
createFiles(arr, cssDirectory)

replaceMediaQuery(
  `${cssDirectory}/${cssMainMedia}`,
  `${cssDirectory}/${cssModalMedia}`
)
generateCSSBundle(cssDirectory, cssMain, cssExclude, cssMainMedia)
generateCSSBundle(cssDirectory, cssModal, cssExclude, cssModalMedia)

function parseCSSFiles(directoryPath) {
  const result = []

  function parseDirectory(directoryPath) {
    const files = fs.readdirSync(directoryPath)

    files.forEach(file => {
      const filePath = path.join(directoryPath, file)
      const stats = fs.statSync(filePath)
      //const exeptFolders = /^_.+/
      if (stats.isDirectory()) {
        // Если это директория, рекурсивно обходим ее) {

        parseDirectory(filePath) // Рекурсивный вызов для вложенной папки
      } else if (
        stats.isFile() &&
        file.endsWith('.css') &&
        !standFiles.test(file)
      ) {
        //console.log(file)
        let content = fs.readFileSync(filePath, 'utf-8')

        const comments = /\/\*[\s\S]*?\*\/|\/\/.*/g
        content = content.replace(comments, '')

        // Регулярное выражение для поиска основного CSS и всех медиазапросов
        const regex = /([\s\S]*?)(@media[\s\S]*|$)/

        // Соответствующая часть CSS-файла
        const [main, media] = content.match(regex).slice(1, 3)

        // Проверяем, есть ли медиазапросы в CSS
        const hasMedia = media.trim().length > 0

        // Добавляем CSS-код в соответствующее поле объекта
        result.push({
          main: main.trim(),
          media: hasMedia ? media.trim() : '',
          filename: file,
        })
      }
    })
  }

  parseDirectory(directoryPath)
  return result
}

function createFiles(array, directory) {
  array.forEach(obj => {
    //const fileName =
    const filePath = path.join(directory, `${obj.filename}`)
    const fileContents = obj.main

    fs.writeFileSync(filePath, fileContents, err => {
      if (err) throw err
      console.log(`File ${filePath} saved successfully.`)
    })

    // Если у объекта есть медиазапросы, добавляем их в переменную mediaQueries
    if (obj.media) {
      mediaQueries += `${obj.media}\n`
    }
  })
  const mediaPath = path.join(directory, cssMainMedia)
  fs.writeFileSync(mediaPath, mediaQueries, err => {
    if (err) throw err
    console.log(`File ${filePath} saved successfully.`)
  })
}

function replaceMediaQuery(filePath, newFilePath) {
  // Читаем содержимое файла
  let fileContent = fs.readFileSync(filePath, 'utf-8')

  // Заменяем все вхождения искомой строки на новую строку
  fileContent = fileContent.replace(
    /@media screen and \(max-width: 1280px\)/g,
    '@media screen and (max-width: 980px)'
  )

  // Записываем измененное содержимое в новый файл
  fs.writeFileSync(newFilePath, fileContent, 'utf-8')
}

function generateCSSBundle(directoryPath, fileName, excludeFiles, media) {
  const cssFiles = fs.readdirSync(directoryPath).filter(file => {
    return file.endsWith('.css') && !excludeFiles.includes(file)
  })

  const importStatements = cssFiles.map(file => {
    return `@import url('./${file}');`
  })
  console.log(importStatements)
  importStatements.push(`@import url('./${media}');`)

  const fileContent = importStatements.join('\n')

  const filePath = path.join(directoryPath, fileName)

  fs.writeFileSync(filePath, fileContent, 'utf-8')
}

// копирование общих файлов стилей

const srcPath = path.join(
  __dirname,
  '../',
  mainFolder,
  `_${commonFilesFolder}`,
  commonFilesFolder,
  'common__styles.css'
)

const dstPath = path.join(
  __dirname,
  '../',
  mainFolder,
  `_${utcfFolder}`,
  utcfFolder,
  commonFilesFolder,
  'common__styles.css'
)

fs.copyFile(srcPath, dstPath, err => {
  if (err) throw err
  console.log('File common__styles.css was copied successfully!')
})

const srcVariablesPath = path.join(
  __dirname,
  '../',
  mainFolder,
  `_${commonFilesFolder}`,
  commonFilesFolder,
  'common_variables.css'
)

const dstVariablesPath = path.join(
  __dirname,
  '../',
  mainFolder,
  `_${utcfFolder}`,
  utcfFolder,
  commonFilesFolder,
  'common_variables.css'
)

fs.copyFile(srcVariablesPath, dstVariablesPath, err => {
  if (err) throw err
  console.log('File common_variables.css was copied successfully!')
})
