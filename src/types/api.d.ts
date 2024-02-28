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
