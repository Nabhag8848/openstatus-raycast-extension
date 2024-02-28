import { getPreferenceValues } from "@raycast/api";
import { NonResolvedReports, Reports, ReportsResponse, StatusReport, UnResolvedReports } from "../types/api";
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
    try {
      const response = await fetch(this.url + "/status_report", {
        method: "POST",
        body: JSON.stringify(report),
        headers: {
          "Content-Type": "application/json",
          [Api.KEY]: this.token,
        },
      });

      const data = await response.json();
    } catch (err) {
      throw new Error(err as string);
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
        const { id, title, status } = report;
        return {
          id,
          title,
          status,
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
}

export const openstatus = new OpenStatusSDK();
