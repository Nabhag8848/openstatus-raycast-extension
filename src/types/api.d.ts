import { Status } from "../enum/tag";

export type StatusReport = {
  id?: number;
  title: string;
  status: Status;
  date: string | null;
  message: string;
  monitors_id: Array<number> | null;
  pages_id: Array<number> | null;
};

export type Reports = {
  id: number;
  title: string;
  status: Status;
  date: string | null;
  message: string;
  monitors_id: Array<number>;
  pages_id: Array<number>;
};

export type ReportsResponse = Array<
  StatusReport & {
    id: number;
    status_report_updates: Array<number>;
  }
>;

export type ReportResponse = StatusReport & {
  id: number;
  status_report_updates: Array<number>;
};

export type NonResolvedReports = {
  id: number;
  title: string;
  status: "investigating" | "identified" | "monitoring";
  date: string;
};

export type UnResolvedReports = {
  [Status.INVESTIGATING]: Array<NonResolvedReports>;
  [Status.IDENTIFIED]: Array<NonResolvedReports>;
  [Status.MONITORING]: Array<NonResolvedReports>;
};

export type StatusPage = {
  id: number;
  title: string;
  description: string;
  slug: string;
};

export type Monitor = {
  id: string;
  name: string;
  method: string;
  active: boolean;
};
