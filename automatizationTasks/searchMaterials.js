const fs = require('fs')
const path = require('path')

// путь к рабочей папке
const srcPath = path.join(
  __dirname,
  '../',
  'simulator-templates',
  '_common_files',
  'common_materials'
)

// путь к конечной папке(utcf)
const dstPath = path.join(
  __dirname,
  '../',
  'simulator-templates',
  '_utcf',
  'utcf',
  'common_materials'
)

try {
  // получаем общий список файлов/папок в рабочей папке
  const directories = fs.readdirSync(srcPath)

  // проходимся по списку
  directories.forEach(elem => {
    // получаем путь к элементу списка и данные по нему
    const filePath = path.join(srcPath, elem)
    const stat = fs.statSync(filePath)

    // проверяем, если это папка, то заходим в нее
    if (stat.isDirectory()) {
      //   получаем список файлов в папке
      const directoryFiles = fs.readdirSync(filePath)

      //   копируем каждый файл в аналогичную папку в utcf
      directoryFiles.forEach(file => {
        // путь к файлу в рабочей папке
        const oldPath = path.join(filePath, file)

        //   путь к подпапке с определенным видом файлов
        const newPathFolder = path.join(dstPath, elem)

        //   если такой подпапки нет в utcf, то создаем
        if (!fs.existsSync(newPathFolder)) {
          fs.mkdirSync(newPathFolder)
        }

        //   новый путь к файлу(в utcf)
        const newPath = path.join(newPathFolder, file)

        // копируем файл из рабочей папки в utcf
        fs.copyFileSync(oldPath, newPath)
        console.log(`${file} was copied successfully!`)
      })
    }
  })
} catch (error) {
  console.log(error)
  return
}
