import { Status } from "../enum/tag";

export type StatusReport = {
  id?: number;
  title: string;
  status: string;
  date: string | null;
  message: string;
  monitors_id: Array<number>;
  pages_id: Array<number>;
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
