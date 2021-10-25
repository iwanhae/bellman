import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronOnly", {
  showIntervalOptions: (args: any): void =>
    ipcRenderer.send("show-interval-options", args),
  showDropdownOptions: (args: any): void =>
    ipcRenderer.send("show-dropdown-options", args),

  addGenericIpcListener: <T>(
    channel: string,
    listener: (e: Event, props: T) => void
  ) => ipcRenderer.on(channel, listener),
  removeGenericIpcListener: (channel: string) =>
    ipcRenderer.removeAllListeners(channel),
});
