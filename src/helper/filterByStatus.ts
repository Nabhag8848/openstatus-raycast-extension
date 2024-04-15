import { DefaultOptionValue } from "../enum/tag";
import { Reports } from "../types/api";

export function filterByStatus({ filterBy, reportsWithQuery }: { filterBy: string; reportsWithQuery: Array<Reports> }) {
  const isDefaultStatus = filterBy === DefaultOptionValue;
  const expectedReports = !isDefaultStatus
    ? reportsWithQuery.filter((report) => report.status.includes(filterBy))
    : reportsWithQuery;

  return expectedReports;
}
