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
  [Status.INVESTIGATING]: { value: "〇 INVESTIGATING  .", color: StatusColors.INVESTIGATING },
  [Status.MONITORING]: { value: "〇    MONITORING   .", color: StatusColors.MONITORING },
  [Status.IDENTIFIED]: { value: "〇     IDENTIFIED      .", color: StatusColors.IDENTIFIED },
  [Status.RESOLVED]: { value: "◉      RESOLVED      .", color: StatusColors.RESOLVED },
};

export const StatusIcons = {
  [Status.INVESTIGATING]: { source: "status_icon_small.png", tintColor: StatusColors.INVESTIGATING },
  [Status.IDENTIFIED]: { source: "status_icon_small.png", tintColor: StatusColors.IDENTIFIED },
  [Status.MONITORING]: { source: "status_icon_small.png", tintColor: StatusColors.MONITORING },
  [Status.RESOLVED]: { source: "status_icon_small.png", tintColor: StatusColors.RESOLVED },
  "all-status-reports": { source: "status_icon_small.png", tintColor: Color.PrimaryText },
};

export const MonitorColors = {
  true: Color.Green,
  false: "#f97316",
};
export const MonitorsIcons = {
  true: { source: "status_icon.png", tintColor: MonitorColors["true"] },
  false: { source: "status_icon.png", tintColor: MonitorColors["false"] },
};

export const StatusTags = {
  [Status.INVESTIGATING]: { value: "〇 INVESTIGATING  .", color: StatusColors.INVESTIGATING },
  [Status.MONITORING]: { value: "〇    MONITORING   .", color: StatusColors.MONITORING },
  [Status.IDENTIFIED]: { value: "〇     IDENTIFIED      .", color: StatusColors.IDENTIFIED },
  [Status.RESOLVED]: { value: "◉      RESOLVED      .", color: StatusColors.RESOLVED },
};

export const StatusListIcons = {
  [Status.INVESTIGATING]: {
    value: {
      source: "status_icon.png",
      tintColor: StatusColors.INVESTIGATING,
    },
    tooltip: "Investigating",
  },
  [Status.IDENTIFIED]: {
    value: { source: "status_icon.png", tintColor: StatusColors.IDENTIFIED },
    tooltip: "Identified",
  },
  [Status.MONITORING]: {
    value: { source: "status_icon.png", tintColor: StatusColors.MONITORING },
    tooltip: "Monitoring",
  },
  [Status.RESOLVED]: { value: { source: "status_icon.png", tintColor: StatusColors.RESOLVED }, tooltip: "Resolved" },
};

export const StatusDefaultOption = {
  title: "All Status Reports",
  value: "all-status-reports",
  icon: StatusIcons["all-status-reports"],
};

export const StatusOption = [
  {
    title: "Investigating",
    value: "investigating",
    icon: StatusIcons[Status.INVESTIGATING],
  },
  {
    title: "Monitoring",
    value: "monitoring",
    icon: StatusIcons[Status.MONITORING],
  },
  {
    title: "Identified",
    value: "identified",
    icon: StatusIcons[Status.IDENTIFIED],
  },
  {
    title: "Resolved",
    value: "resolved",
    icon: StatusIcons[Status.RESOLVED],
  },
];
