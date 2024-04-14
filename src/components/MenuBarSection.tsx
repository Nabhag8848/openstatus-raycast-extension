import { LaunchType, MenuBarExtra, launchCommand } from "@raycast/api";

import { StatusIcons } from "../enum/tag";
import { NonResolvedReports } from "../types/api";
import openstatus from "../services/OpenStatusSDK";

export default function MenuBarSection({
  reports,
  sectionTitle,
}: {
  reports: Array<NonResolvedReports>;
  sectionTitle: string;
}) {
  async function openUpdateStatusReportForm(id: number) {
    const [report, allPages, allMonitors] = await Promise.all([
      openstatus.getStatusReport(id),
      openstatus.getAllStatusPage(),
      openstatus.getAllMonitors(),
    ]);

    await launchCommand({
      name: "update-status-report",
      type: LaunchType.UserInitiated,
      context: {
        type: "update_report_menu_bar",
        payload: {
          report,
          allMonitors,
          allPages,
        },
      },
    });
  }

  return (
    <MenuBarExtra.Section title={sectionTitle}>
      {reports.map((report) => {
        const { status, title, id } = report;
        return (
          <MenuBarExtra.Item
            title={title}
            key={id}
            icon={StatusIcons[status]}
            onAction={() => openUpdateStatusReportForm(id)}
          />
        );
      })}
    </MenuBarExtra.Section>
  );
}
