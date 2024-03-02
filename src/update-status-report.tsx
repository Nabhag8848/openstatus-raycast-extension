import { Action, ActionPanel, Icon, LaunchType, List, launchCommand, useNavigation } from "@raycast/api";
import { useEffect, useState } from "react";
import { openstatus } from "./services/OpenStatusSDK";
import { Reports } from "./types/api";
import { tags } from "./enum/tag";
import { randomUUID } from "crypto";
import UpdateStatusReportForm from "./update-status-report-form";

export default function UpdateStatusReports() {
  const [reports, setReports] = useState<Array<Reports> | undefined>();
  const { push } = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(
    function () {
      async function onLoad() {
        if (reports) return;

        const statusReports = await openstatus.getAllStatusReport();
        setReports(statusReports);
        setIsLoading(false);
      }
      onLoad();
    },
    [reports, isLoading],
  );

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
                icon="../assets/OpenStatus.png"
                accessories={[
                  {
                    tag: tags[status],
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
                        push(<UpdateStatusReportForm report={report} />);
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
