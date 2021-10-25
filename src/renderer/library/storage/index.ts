import { Settings } from "@library/settings";
import { Result } from "@library/types";

export const saveStorage = (key: string, value: Settings | Result[]): void => {
  const settingsFormatted = JSON.stringify(value);
  localStorage.setItem(key, settingsFormatted);
};

export const loadStorage = (key: string) => {
  const stringifiedSettings = localStorage.getItem(key);

  if (!stringifiedSettings) {
    console.error("no saved localStorage settings:", `'${key}'`);
    return {};
  }

  console.log("savedSettings:", stringifiedSettings);

  return JSON.parse(stringifiedSettings);
};

export const clearStorage = (): void => {
  localStorage.clear();
};
