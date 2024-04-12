import { getPreferenceValues } from "@raycast/api";
import {
  Monitor,
  NonResolvedReports,
  ReportResponse,
  Reports,
  ReportsResponse,
  StatusPage,
  StatusReport,
  UnResolvedReports,
} from "../types/api";
import { Api } from "../enum/api";
import fetch from "node-fetch";
import { Status } from "../enum/tag";

class OpenStatusSDK {
  private url: string = Api.URL;
  private token!: string;

  constructor() {
    const { access_token }: { access_token: string } = getPreferenceValues();
    this.token = access_token;
  }

  async createStatusReport(report: StatusReport) {
    const { monitors_id, pages_id } = report;
    const body = {
      ...report,
      monitors_id: [],
      pages_id: [],
      ...(monitors_id && monitors_id.length && { monitors_id: monitors_id.map(Number) }),
      ...(pages_id && pages_id.length && { pages_id: pages_id.map(Number) }),
    };
    try {
      const response = await fetch(this.url + "/status_report", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          [Api.KEY]: this.token,
        },
      });

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  async getAllStatusReport(): Promise<Array<Reports>> {
    try {
      const response = await fetch(this.url + "/status_report", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          [Api.KEY]: this.token,
        },
      });
      const data = (await response.json()) as ReportsResponse;

      const reports = data.map((report) => {
        const { id, title, status, date, message, monitors_id, pages_id } = report;
        return {
          id,
          title,
          status,
          date,
          message,
          monitors_id: [],
          pages_id: [],
          ...(monitors_id && monitors_id.length && { monitors_id }),
          ...(pages_id && pages_id.length && { pages_id }),
        };
      });

      return reports;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getAllUnresolvedStatusReport(): Promise<UnResolvedReports> {
    try {
      const reports = await this.getAllStatusReport();

      const results: UnResolvedReports = {
        [Status.INVESTIGATING]: [],
        [Status.IDENTIFIED]: [],
        [Status.MONITORING]: [],
      };

      const unresolvedReports = reports.filter(
        (report) => report.status !== Status.RESOLVED,
      ) as Array<NonResolvedReports>;

      unresolvedReports.forEach((report) => {
        const { status } = report;
        results[status].push(report);
      });

      return results;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getStatusReport(id: number): Promise<Reports> {
    try {
      const response = await fetch(this.url + `/status_report/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          [Api.KEY]: this.token,
        },
      });
      const report = (await response.json()) as ReportResponse;

      const { monitors_id, pages_id } = report;

      return {
        ...report,
        monitors_id: [],
        pages_id: [],
        ...(monitors_id && monitors_id.length && { monitors_id }),
        ...(pages_id && pages_id.length && { pages_id }),
      };
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async updateStatusReport(report: StatusReport) {
    const { monitors_id, pages_id } = report;
    try {
      const body = {
        ...report,
        id: undefined,
        monitors_id: [],
        pages_id: [],
        ...(monitors_id && monitors_id.length && { monitors_id: monitors_id.map((id) => Number(id)) }),
        ...(pages_id && pages_id.length && { pages_id: pages_id.map((id) => Number(id)) }),
      };

      const response = await fetch(this.url + `/status_report/${report.id as number}/update`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          [Api.KEY]: this.token,
        },
      });

      return response.ok;
    } catch (err) {
      return false;
    }
  }

  async getAllStatusPage() {
    try {
      const response = await fetch(this.url + `/page`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          [Api.KEY]: this.token,
        },
      });
      const data = (await response.json()) as Array<StatusPage>;
      return data;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getAllMonitors() {
    try {
      const response = await fetch(this.url + `/monitor`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          [Api.KEY]: this.token,
        },
      });
      const data = (await response.json()) as Array<Monitor>;
      return data;
    } catch (err) {
      throw new Error(err as string);
    }
  }
}

export const openstatus = new OpenStatusSDK();
