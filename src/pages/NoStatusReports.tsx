import { Action, ActionPanel, Icon, LaunchType, List, launchCommand } from "@raycast/api";

export function NoStatusReports() {
  return (
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
  );
}
