import { getDefaultMonitorsId, getDefaultPagesId } from "../helper";
import { Monitor, Reports, StatusPage } from "../types/api";
import UpdateStatusReportForm from "../update-status-report-form";

export default function OpenUpdateReportForm({
  report,
  allPages,
  allMonitors,
}: {
  report: Reports;
  allPages: Array<StatusPage> | undefined;
  allMonitors: Array<Monitor> | undefined;
}) {
  const defaultPages = getDefaultPagesId(allPages, report.pages_id);
  const defaultMonitors = getDefaultMonitorsId(allMonitors, report.monitors_id);

  return (
    <UpdateStatusReportForm
      report={report}
      defaultPages={defaultPages}
      defaultMonitors={defaultMonitors}
      allMonitors={allMonitors}
      allPages={allPages}
    />
  );
}
