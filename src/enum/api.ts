import { Image, Keyboard, Toast } from "@raycast/api";

export enum Api {
  URL = "https://api.openstatus.dev/v1",
  KEY = "x-openstatus-key",
  DASHBOARD_URL = "https://www.openstatus.dev/app/",
}

export const FailureToast = {
  style: Toast.Style.Failure,
  title: "Something Went Wrong",
  message: "Please try again. If the issue persists, please contact us",
};

export const Shortcuts: { [key: string]: Keyboard.Shortcut } = {
  dashboard: { modifiers: ["cmd", "shift"], key: "d" },
  preferences: { modifiers: ["cmd"], key: "," },
};

export const MenuBarIcon = {
  source: "../assets/OpenStatus.png",
  mask: Image.Mask.Circle,
};
