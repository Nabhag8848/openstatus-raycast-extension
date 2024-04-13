import {
  Action,
  ActionPanel,
  Color,
  Icon,
  LaunchType,
  List,
  environment,
  launchCommand,
  useNavigation,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { openstatus } from "./services/OpenStatusSDK";
import { Monitor, Reports, StatusPage } from "./types/api";
import { MonitorColors, StatusListIcons, StatusMessage } from "./enum/tag";
import { randomUUID } from "crypto";
import UpdateStatusReportForm from "./update-status-report-form";
import { getDefaultMonitors, getDefaultMonitorsId, getDefaultPages, getDefaultPagesId } from "./helper/getDefault";
import { getTimeAgoFromISO } from "./helper/getTimeAgoFromISO";
import { StatusFilterDropdown } from "./components/StatusFilterDropdown";

export default function UpdateStatusReports() {
  const [allReports, setAllReports] = useState<Array<Reports> | undefined>();
  const [allPages, setAllPages] = useState<Array<StatusPage> | undefined>();
  const [allMonitors, setAllMonitors] = useState<Array<Monitor> | undefined>();
  const { push } = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reports, setReports] = useState<Array<Reports>>();

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
        setAllReports(statusReports);
        setReports(statusReports);
        setIsLoading(false);
      }

      if (allReports || allMonitors || allPages || reports) return;
      onLoad();
    },
    [allReports, isLoading, reports],
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
    <List
      isLoading={isLoading}
      navigationTitle="Update Status Report"
      searchBarPlaceholder="Search Status Reports"
      isShowingDetail={reports && reports.length > 0}
      searchBarAccessory={<StatusFilterDropdown setReports={setReports} allReports={allReports} />}
    >
      {reports && reports.length > 0 ? (
        <List.Section title="Select Report to Update">
          {reports.map((report) => {
            const { id, status, title, pages_id, monitors_id, date, message } = report;
            const pages = getDefaultPages(allPages, pages_id);
            const monitors = getDefaultMonitors(allMonitors, monitors_id);
            return (
              <List.Item
                id={id.toString()}
                title={title}
                icon={StatusListIcons[status]}
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
                detail={
                  <List.Item.Detail
                    markdown={`# 📃 Title \n ${title}\n # 💥 Message \n ${message}`}
                    metadata={
                      <List.Item.Detail.Metadata>
                        <List.Item.Detail.Metadata.TagList title="Current Status">
                          <List.Item.Detail.Metadata.TagList.Item
                            text={StatusMessage[status].value}
                            color={StatusMessage[status].color}
                          />
                        </List.Item.Detail.Metadata.TagList>
                        <List.Item.Detail.Metadata.Separator />
                        <List.Item.Detail.Metadata.TagList title="Pages">
                          {pages &&
                            (pages.length ? (
                              pages.map((page) => {
                                return <List.Item.Detail.Metadata.TagList.Item text={page.title} key={page.id} />;
                              })
                            ) : (
                              <List.Item.Detail.Metadata.TagList.Item text="None" color={Color.Magenta} />
                            ))}
                        </List.Item.Detail.Metadata.TagList>
                        <List.Item.Detail.Metadata.Separator />
                        <List.Item.Detail.Metadata.TagList title="Monitors">
                          {monitors &&
                            (monitors.length ? (
                              monitors.map((monitor) => {
                                return (
                                  <List.Item.Detail.Metadata.TagList.Item
                                    text={monitor.name}
                                    key={monitor.id}
                                    color={monitor.active ? MonitorColors.true : MonitorColors.false}
                                  />
                                );
                              })
                            ) : (
                              <List.Item.Detail.Metadata.TagList.Item text="None" color={Color.Magenta} />
                            ))}
                        </List.Item.Detail.Metadata.TagList>
                        <List.Item.Detail.Metadata.Separator />
                        <List.Item.Detail.Metadata.Label
                          title="Started"
                          text={{ value: getTimeAgoFromISO(date as string), color: Color.SecondaryText }}
                        />
                        <List.Item.Detail.Metadata.Separator />
                      </List.Item.Detail.Metadata>
                    }
                  />
                }
              />
            );
          })}
        </List.Section>
      ) : allReports && allReports.length < 0 ? (
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
      ) : (
        <List.EmptyView
          title="No Reports With Current Selected Filter Status"
          icon={Icon.Book}
          description="Create Status Report"
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
