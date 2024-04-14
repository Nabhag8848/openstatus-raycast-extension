import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { Reports } from "../types/api";

export default function NoFilteredReports({
  allReports,
  setReports,
}: {
  allReports: Array<Reports> | undefined;
  setReports: React.Dispatch<React.SetStateAction<Reports[] | undefined>>;
}) {
  return (
    <List.EmptyView
      title={`No Reports Currently with Status`}
      icon={Icon.Megaphone}
      description="Press Enter to Change Filter Back to Default"
      actions={
        <ActionPanel>
          <Action
            title="Change Filter to Default"
            icon={Icon.RotateAntiClockwise}
            onAction={() => {
              setReports(allReports);
            }}
          />
        </ActionPanel>
      }
    />
  );
}
