import { Action, ActionPanel, Icon, LaunchType, List, launchCommand } from "@raycast/api";
import { useEffect, useState } from "react";
import { openstatus } from "./services/OpenStatusSDK";
import { Reports } from "./types/api";
import { tags } from "./enum/tag";

export default function ShowStatusReports() {
  const [reports, setReports] = useState<Array<Reports> | undefined>();
  const isLoading = reports === undefined;

  useEffect(
    function () {
      async function onLoad() {
        const statusReports = await openstatus.getAllStatusReport();
        setReports(statusReports);
      }
      onLoad();
    },
    [reports],
  );

  return (
    <List isLoading={isLoading} navigationTitle="Status Reports" searchBarPlaceholder="Search Status Reports">
      {reports && reports.length > 0 ? (
        reports.map((report) => {
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
                  <Action title="Update Report" icon={Icon.Pencil} />
                </ActionPanel>
              }
            />
          );
        })
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
