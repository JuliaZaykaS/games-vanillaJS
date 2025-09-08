const fs = require('fs');
const path = require('path');

const parceDir = path.join(__dirname, "../", "simulator-templates", 'universal_templates');

const jsPath = path.join(__dirname, "../", "simulator-templates", '_utcf', "utcf", 'individual_files', 'individual_scripts')
let arr = searchRenderFunctions(parceDir)
createFiles(arr, jsPath)

function searchRenderFunctions(folderPath) {
  const renderFunctions = [];

  // Рекурсивно обходим все файлы и директории в папке
  function traverseDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      //const exeptFolders = /^_.+/
      if (stat.isFile()) { // Если это файл, проверяем его содержимое
        let fileContent = fs.readFileSync(filePath, 'utf8');

        const comments = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
        fileContent = fileContent.replace(comments, '');


        // Ищем все функции, начинающиеся со слова "render"
        const regex = /function render(\w*\s*[\s\S]+?\})*/g;
        let match;
        //ищем импорты
        const imp = /import\s*\{[^{}]*\}\s*from/g
        let match1



        while (((match = regex.exec(fileContent)) !== null)) {
          const functionName = match[0];
          let Fimp = ''
          if (match1 = imp.exec(fileContent)) {
            Fimp = match1[0]
          }
          renderFunctions.push({
            imp: Fimp,
            function: functionName,
            file: filePath
          });
        }
      } else if (stat.isDirectory()) { // Если это директория, рекурсивно обходим ее
        traverseDir(filePath);
      }
    });
  }

  traverseDir(folderPath);

  return renderFunctions;
}

//создаем js файлы с рендер-функциями в указанной папке
function createFiles(array, directory) {
  array.forEach((obj) => {
    const functionName = obj.function.match(/function\s+([^(]+)/)[1];
    const filePath = path.join(directory, `${functionName}.js`);
    let imports = ''
    if (obj.imp) {
      imports = `${obj.imp} "../../common_files/common_scripts.js"\r\n \r\n `
    }
    const fileContents = `${imports}export ${obj.function}`;

    fs.writeFile(filePath, fileContents, (err) => {
      if (err) throw err;
      console.log(`File ${filePath} saved successfully.`);
    });
  });
}

const srcPath = path.join(__dirname, "../", "simulator-templates", '_common_files', 'common_files', 'common_scripts.js');

const dstPath = path.join(__dirname, "../", "simulator-templates", '_utcf', 'utcf', 'common_files', 'common_scripts.js');

fs.copyFile(srcPath, dstPath, (err) => {
  if (err) throw err;
  console.log('File was copied successfully!');
});


//searchRenderFunctions(folderPath)
//console.log(searchRenderFunctions('C:\\Users\\USER\\Projects\\templates_meo\\simulator-templates'));