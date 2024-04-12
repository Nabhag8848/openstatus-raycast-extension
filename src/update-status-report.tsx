import {
  Action,
  ActionPanel,
  Icon,
  ImageMask,
  LaunchType,
  List,
  environment,
  launchCommand,
  useNavigation,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { openstatus } from "./services/OpenStatusSDK";
import { Monitor, Reports, StatusPage } from "./types/api";
import { StatusListIcons, tags } from "./enum/tag";
import { randomUUID } from "crypto";
import UpdateStatusReportForm from "./update-status-report-form";
import { getDefaultMonitorsId, getDefaultPagesId } from "./helper/getDefault";

export default function UpdateStatusReports() {
  const [reports, setReports] = useState<Array<Reports> | undefined>();
  const [allPages, setAllPages] = useState<Array<StatusPage> | undefined>();
  const [allMonitors, setAllMonitors] = useState<Array<Monitor> | undefined>();
  const { push } = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(
    function () {
      async function onLoad() {
        const [statusReports, statusPages, Monitors] = await Promise.all([
          openstatus.getAllStatusReport(),
          openstatus.getAllStatusPage(),
          openstatus.getAllMonitors(),
        ]);
        setAllPages(statusPages);
        setAllMonitors(Monitors);
        setReports(statusReports);
        setIsLoading(false);
      }

      if (reports || allMonitors || allPages) return;

      onLoad();
    },
    [reports, isLoading],
  );

  useEffect(function () {
    if (environment.launchContext) {
      const { pages, report, monitors }: { report: Reports; pages: Array<StatusPage>; monitors: Array<Monitor> } =
        environment.launchContext.payload;

      const defaultPages = getDefaultPagesId(pages, report.pages_id);
      const defaultMonitors = getDefaultMonitorsId(monitors, report.monitors_id);

      push(
        <UpdateStatusReportForm
          report={report}
          defaultPages={defaultPages}
          defaultMonitors={defaultMonitors}
          allMonitors={monitors}
          allPages={pages}
        />,
      );
    }
  }, []);

  return (
    <List isLoading={isLoading} navigationTitle="Update Status Report" searchBarPlaceholder="Search Status Reports">
      {reports && reports.length > 0 ? (
        <List.Section title="Select Report to Update">
          {reports.map((report) => {
            const { id, status, title } = report;
            return (
              <List.Item
                id={id.toString()}
                title={title}
                icon={StatusListIcons[status]}
                accessories={[
                  {
                    tag: tags[status],
                  },
                  {
                    icon: {
                      source: "../assets/OpenStatus.png",
                      mask: ImageMask.RoundedRectangle,
                    },
                  },
                  {
                    tooltip: "this is tooltip",
                  },
                ]}
                actions={
                  <ActionPanel>
                    <Action
                      title="Select"
                      icon={Icon.List}
                      onAction={async () => {
                        setIsLoading(true);
                        const report = await openstatus.getStatusReport(id);
                        const defaultPages = getDefaultPagesId(allPages, report.pages_id);
                        const defaultMonitors = getDefaultMonitorsId(allMonitors, report.monitors_id);

                        push(
                          <UpdateStatusReportForm
                            report={report}
                            defaultPages={defaultPages}
                            defaultMonitors={defaultMonitors}
                            allMonitors={allMonitors}
                            allPages={allPages}
                          />,
                        );
                        setIsLoading(false);
                      }}
                    />
                  </ActionPanel>
                }
                key={randomUUID().toString()}
              />
            );
          })}
        </List.Section>
      ) : (
        <List.EmptyView
          title="No Status Reports"
          icon={Icon.Book}
          description="Create Your First Status Report"
          actions={
            <ActionPanel>
              <Action
                title="Create Report"
                icon={Icon.NewDocument}
                onAction={async () => {
                  await launchCommand({
                    name: "create-status-report",
                    type: LaunchType.UserInitiated,
                  });
                }}
              />
            </ActionPanel>
          }
        />
      )}
    </List>
  );
}
