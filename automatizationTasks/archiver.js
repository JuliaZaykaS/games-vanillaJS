const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')

// имена папок и расширений
const mainFolder = 'simulator-templates'
const incomingFolder = 'incoming_data'
const utcfFolder = 'utcf'
const backupFolder = 'backup_library'
const fileType = 'zip'

// Определить пути к папкам для архивирования
const utcfPath = path.join(
  __dirname,
  '../',
  mainFolder,
  `_${utcfFolder}`,
  utcfFolder
)
const incoming_dataPath = path.join(
  __dirname,
  '../',
  mainFolder,
  `_${incomingFolder}`,
  incomingFolder
)

// Определить путь к старому zip-файлу для замены
const utcfZipFilePath = path.join(
  __dirname,
  '../',
  mainFolder,
  `_${utcfFolder}`,
  `${utcfFolder}.${fileType}`
)

const incoming_dataZipFilePath = path.join(
  __dirname,
  '../',
  mainFolder,
  `_${incomingFolder}`,
  `${incomingFolder}.${fileType}`
)

// путь до папки с бекапами
const backupFolderPath = path.join(__dirname, '../', `_${backupFolder}`)

try {
  // проверяем, есть ли папка с бэкапами, если нет, то создаем
  if (!fs.existsSync(backupFolderPath)) {
    fs.mkdirSync(backupFolderPath)
  }
  // перемещаем старые архивы в папку с бекапом
  moveOldFilesToBackup(utcfZipFilePath)
  moveOldFilesToBackup(incoming_dataZipFilePath)

  // Создаем новый экземпляр JSZip
  const utcfZip = new JSZip()
  const incoming_dataZip = new JSZip()

  // рекурсивно добавить все файлы и подпапки в папке в zip-архив
  addFolderToZip(utcfPath, utcfZip, path.basename(utcfPath))
  addFolderToZip(
    incoming_dataPath,
    incoming_dataZip,
    path.basename(incoming_dataPath)
  )

  // создаем архивы библиотеки и входящих данных
  zipRewriter(utcfZip, utcfZipFilePath, utcfFolder)
  zipRewriter(incoming_dataZip, incoming_dataZipFilePath, incomingFolder)
} catch (error) {
  console.log(error)
  return
}

// сохранить zip в файловой системе, заменив любой существующий zip-фай
function zipRewriter(newZipFile, oldZipFilePath, zipName) {
  newZipFile
    .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream(oldZipFilePath))
    .on('finish', () => {
      console.log(`${zipName} zip archive created successfully.`)

      // удаляем самую старую версию библиотеки и входящих данных
      checkForBackups(backupFolderPath)
    })
}

// функция для проверки директории с бэкапом на наличие других копий, если файлов больше 6(по 3  для incoming_data и utcf ), то удаляем самые старые
function checkForBackups(directory) {
  // получаем данные о файлах в папке с бэкапом
  const files = fs.readdirSync(directory)

  const filteredFiles = files.sort((a, b) => {
    let newA = conversionToDate(a)
    let newB = conversionToDate(b)
    if (newA < newB) {
      return -1
    }
    if (newA > newB) {
      return 1
    }

    return 0
  })

  // 8 - потому что, сначала переносим готовые архивы, а потом удаляем старые (иначе при ошибке в зиповании старые удаляются)
  if (filteredFiles.length === 8) {
    // удаляем старые файлы
    fs.unlinkSync(path.join(directory, filteredFiles[0]))
    fs.unlinkSync(path.join(directory, filteredFiles[1]))
    console.log(`${filteredFiles[0]} удален успешно`)
    console.log(`${filteredFiles[1]} удален успешно`)
  } else if (filteredFiles.length > 8) {
    console.log('СТАРЫЕ АРХИВЫ НЕ УДАЛИЛИСЬ!!!!!!')
  }
}

//функция для перемещения старых архивов в папку с бекапом
function moveOldFilesToBackup(file) {
  // получаем данные по зип-файлу
  const stats = fs.statSync(file)

  // преобразовываем время в удобное
  const minutes =
    stats.ctime.getUTCMinutes() < 10
      ? `0${stats.ctime.getUTCMinutes()}`
      : stats.ctime.getUTCMinutes()
  const month =
    stats.ctime.getUTCMonth() + 1 < 10
      ? `0${stats.ctime.getUTCMonth() + 1}`
      : stats.ctime.getUTCMonth() + 1
  const hours =
    stats.ctime.getUTCHours() < 10
      ? `0${stats.ctime.getUTCHours()}`
      : stats.ctime.getUTCHours()
  const days =
    stats.ctime.getUTCDate() < 10
      ? `0${stats.ctime.getUTCDate()}`
      : stats.ctime.getUTCDate()

  //  получаем дату создания файла
  const getDateOfCreation = `${days}_${month}_${stats.ctime.getUTCFullYear()}_${hours}_${minutes}`

  // составляем новое имя для файла в формате ДД_ММ_ГГГГ_ЧЧ_ММ_имя-файла.zip
  const newFileName = `${getDateOfCreation}_${path.basename(file)}`

  // получаем обновленный путь к файлу
  const newPath = path.join(backupFolderPath, newFileName)

  // перемещаем файл из папки в backup
  fs.renameSync(file, newPath)
}

// функция, чтобы рекурсивно добавить все файлы и подпапки в папке в zip-архив
function addFolderToZip(folderPath, folderZip, folderName = '') {
  const files = fs.readdirSync(folderPath)

  files.forEach(file => {
    const filePath = path.join(folderPath, file)
    const fileStats = fs.statSync(filePath)

    if (fileStats.isDirectory()) {
      addFolderToZip(filePath, folderZip, path.join(folderName, file))
    } else {
      const fileContents = fs.readFileSync(filePath)
      folderZip.file(path.join(folderName, file), fileContents)
    }
  })
}

// функция для преобразования даты из имени файла в стандартную дату для последующего сравнения
function conversionToDate(date) {
  const dateFromFilename = [
    ...date
      .substring(0, 10)
      .replace(/(\d{2})\_(\d{2})\_(\d{4})/, '$3-$2-$1')
      .split('-'),
    ...date.substring(11, 16).split('_'),
  ].map(el => Number(el))

  const newDate = new Date(Date.UTC(...dateFromFilename))

  return newDate
}
