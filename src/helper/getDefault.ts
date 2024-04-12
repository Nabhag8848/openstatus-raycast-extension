import { Monitor, StatusPage } from "../types/api";

export function getDefaultMonitorsId(allMonitors: Array<Monitor> | undefined, monitors_id: Array<number>) {
  const monitorsId = monitors_id.map(String);
  const defaultMonitors = allMonitors
    ?.filter((monitor) => monitorsId.includes(monitor.id.toString()))
    .map((monitor) => monitor.id.toString()) as string[];

  return defaultMonitors;
}

export function getDefaultPagesId(allPages: Array<StatusPage> | undefined, pages_id: Array<number>) {
  const pagesId = pages_id.map(String);
  const defaultPages = allPages
    ?.filter((page) => pagesId.includes(page.id.toString()))
    .map((page) => page.id.toString()) as string[];

  return defaultPages;
}
