import { BrowserWindow, dialog } from 'electron';
import path from 'path';

export const openFile = (mainWindow: BrowserWindow) => {
  dialog
    .showOpenDialog({
      properties: ['openFile'],
    })
    .then((result) => {
      if (!result.canceled) {
        mainWindow.webContents.send('ipc-onOpenFile', result.filePaths[0]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const openFolder = (mainWindow: BrowserWindow) => {
  dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then((result) => {
      if (!result.canceled && result.filePaths.length > 0) {
        const fs = require('fs');

        const fileTree: any = {
          filePath: result.filePaths[0],
          name: path.basename(result.filePaths[0]),
          children: [],
        };

        const readDir = (dir: string, parentChildren: any[]) => {
          const files = fs.readdirSync(dir);
          files.forEach((file: string) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
              const newDir = {
                filePath: filePath,
                name: file,
                children: [],
              };
              parentChildren.push(newDir);
              readDir(filePath, newDir.children);
            } else {
              parentChildren.push({
                filePath: filePath,
                name: file,
                children: [],
              });
            }
          });
        };

        readDir(result.filePaths[0], fileTree.children);
        mainWindow.webContents.send('ipc-openFolder', fileTree);
      }
    })
    .catch((err) => {
      console.error('Error opening directory', err);
    });
};
