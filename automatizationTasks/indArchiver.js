const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function zipFoldersInsideDirectory(sourceDir) {
    const folders = fs.readdirSync(sourceDir, { withFileTypes: true });

    for (const folder of folders) {
        const folderPath = path.join(sourceDir, folder.name);

        if (folder.isDirectory()) {
            const zip = new JSZip();
            const files = getAllFilesFromFolder(folderPath);

            for (const file of files) {
                if (!file.endsWith('.zip')) {
                    const relativePath = path.relative(folderPath, file);
                    const fileContent = fs.readFileSync(file);
                    zip.file(relativePath, fileContent);
                }
            }

            const zipFilePath = path.join(folderPath, `${folder.name}.zip`);
            const zipData = await zip.generateAsync({ type: 'nodebuffer' });
            fs.writeFileSync(zipFilePath, zipData);
        }
    }

    console.log('Завершено');
}

function getAllFilesFromFolder(folder) {
    const files = [];

    fs.readdirSync(folder).forEach((file) => {
        const filePath = path.join(folder, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            files.push(...getAllFilesFromFolder(filePath));
        } else {
            files.push(filePath);
        }
    });

    return files;
}

const targetDirectory = path.join(__dirname, '../', 'simulator-templates', 'individual_courses_projects', 'individual_templates')

zipFoldersInsideDirectory(targetDirectory);