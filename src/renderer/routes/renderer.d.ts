import { IpcRenderer } from "electron";

declare global {
  interface Window {
    electronOnly: ElectronOnly;
  }
}

export interface ElectronOnly {
  github: () => Promise<void>;
  showIntervalOptionsDropdown: (args: any) => void;

  addGenericIpcListener: <T>(
    channel: string,
    listener: (e: Event, props: T) => void
  ) => IpcRenderer;
  removeGenericIpcListener: (channel: string) => IpcRenderer;
}
