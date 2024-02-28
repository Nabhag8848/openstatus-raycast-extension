import { getPreferenceValues } from "@raycast/api";
import { Reports, ReportsResponse, StatusReport } from "../types/api";
import { Api } from "../enum/api";
import fetch from "node-fetch";

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
}

export const openstatus = new OpenStatusSDK();
