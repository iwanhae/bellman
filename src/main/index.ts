import { app, BrowserWindow, ipcMain, shell, Menu, Tray } from "electron";
import path from "path";

// BrowserWindow Object. avoid garbage collection
let window: BrowserWindow | null = null;

// Single instance lock. avoid more than one window
const gotTheLock = app.requestSingleInstanceLock();

const createWindow = async () => {
  window = new BrowserWindow({
    width: 320,
    height: 480,
    webPreferences: {
      // renderer process에서 Node.js를 사용하지않도록 설정 (avoid xss issues)
      // Node.js 에서 제공하는 fs, 같은걸 쓰고싶으면 main script 에서 handling 하도록 유도
      nodeIntegration: false,
      // preload scripts를 index.html과 다른 javascript context에서 실행하도록 설정 (security issue)
      contextIsolation: true,
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  // todo: codes for production level
  if (process.env.NODE_ENV === "development") {
    await window.loadFile("index.html");
  }

  // todo: 이걸로 바꾸자
  ipcMain.on("show-dropdown-options", (event, args) => {
    const { options, channelName } = args;

    const menu = Menu.buildFromTemplate(
      options.map(
        (option: {
          title: string;
          value: number | string;
          checked: boolean;
        }) => {
          return {
            label: option.title,
            checked: option.checked,
            click: (): void =>
              window?.webContents.send(channelName, {
                title: option.title,
                value: option.value,
              }),
            type: "checkbox",
          };
        }
      )
    );

    menu.popup();
  });

  ipcMain.on("show-interval-options", (event, args) => {
    const { options } = args;

    const menu = Menu.buildFromTemplate([
      ...options.map(
        (option: { title: string; value: number; checked: boolean }) => {
          return {
            label: option.title,
            checked: option.checked,
            click: (): void =>
              window?.webContents.send("request-change-interval-option", {
                title: option.title,
                value: option.value,
              }),
            type: "checkbox",
          };
        }
      ),
    ]);

    menu.popup();
  });

  ipcMain.on("show-edit-course-dropdown", (event, args) => {
    const menu = Menu.buildFromTemplate([
      {
        label: "수정",
        click: () => window?.webContents.send("show-edit-popup-response"),
      },
      {
        label: "삭제",
        click: () => window?.webContents.send("delete-course"),
      },
    ]);

    menu.popup();
  });

  window.on("closed", () => {
    window = null;
  });
};

if (!gotTheLock) {
  // if user tried to open more windows
  app.exit();
} else {
  app.whenReady().then(async () => {
    await createWindow();

    app.on("activate", async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await createWindow();
      }
    });
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
