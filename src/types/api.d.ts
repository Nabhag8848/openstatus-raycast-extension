import { Status } from "../enum/tag";

export type StatusReport = {
  title: string;
  status: string;
  date: string;
  message: string;
};

export type Reports = {
  id: number;
  title: string;
  status: Status;
};

export type ReportsResponse = Array<Reports & { status_report_updates: Array<number> }>;

export type NonResolvedReports = {
  id: number;
  title: string;
  status: "investigating" | "identified" | "monitoring";
};

export type UnResolvedReports = {
  [Status.INVESTIGATING]: Array<NonResolvedReports>;
  [Status.IDENTIFIED]: Array<NonResolvedReports>;
  [Status.MONITORING]: Array<NonResolvedReports>;
};
