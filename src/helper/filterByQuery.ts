import Fuse from "fuse.js";
import { Reports } from "../types/api";

export function filterByQuery({ allReports, query }: { allReports: Array<Reports> | undefined; query: string }) {
  const Reports = allReports as Array<Reports>;
  const reportsWithQuery = query.length
    ? new Fuse(Reports, {
        keys: ["title"],
        minMatchCharLength: 1,
      })
        .search(query)
        .map((report) => report.item)
    : Reports;

  return reportsWithQuery;
}
