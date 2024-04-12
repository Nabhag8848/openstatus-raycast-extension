import { Color } from "@raycast/api";

interface Tag {
  color: string;
  value: string;
}

export enum Status {
  INVESTIGATING = "investigating",
  MONITORING = "monitoring",
  IDENTIFIED = "identified",
  RESOLVED = "resolved",
}

enum StatusColors {
  INVESTIGATING = "#F43F5E",
  MONITORING = "#3B82F6",
  IDENTIFIED = "#F59E0B",
  RESOLVED = "#22C55E",
}

export const tags: Record<Status, Tag> = {
  [Status.INVESTIGATING]: { value: "Investigating", color: StatusColors.INVESTIGATING },
  [Status.MONITORING]: { value: "Monitoring", color: StatusColors.MONITORING },
  [Status.IDENTIFIED]: { value: "Identified", color: StatusColors.IDENTIFIED },
  [Status.RESOLVED]: { value: "Resolved", color: StatusColors.RESOLVED },
};

export const StatusIcons = {
  [Status.INVESTIGATING]: { source: "status_icon_small.png", tintColor: StatusColors.INVESTIGATING },
  [Status.IDENTIFIED]: { source: "status_icon_small.png", tintColor: StatusColors.IDENTIFIED },
  [Status.MONITORING]: { source: "status_icon_small.png", tintColor: StatusColors.MONITORING },
};

export const MonitorsIcons = {
  true: { source: "status_icon.png", tintColor: "#22C55E" },
  false: { source: "status_icon.png", tintColor: "#f97316" },
};

export const StatusMessage = {
  [Status.INVESTIGATING]: { value: "Investigating  ", color: Color.Red },
  [Status.MONITORING]: { value: "Monitoring    ", color: Color.Blue },
  [Status.IDENTIFIED]: { value: "Identified     ", color: Color.Yellow },
  [Status.RESOLVED]: { value: "Resolved     ", color: Color.Green },
};

export const StatusListIcons = {
  [Status.INVESTIGATING]: {
    source: "status_icon.png",
    tintColor: StatusColors.INVESTIGATING,
    tooltip: "Investigating",
  },
  [Status.IDENTIFIED]: { source: "status_icon.png", tintColor: StatusColors.IDENTIFIED, tooltip: "Identified" },
  [Status.MONITORING]: { source: "status_icon.png", tintColor: StatusColors.MONITORING, tooltip: "Monitoring" },
  [Status.RESOLVED]: { source: "status_icon.png", tintColor: StatusColors.RESOLVED, tooltip: "Resolved" },
};
