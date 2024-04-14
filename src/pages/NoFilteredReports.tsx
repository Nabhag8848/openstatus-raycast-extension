import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { Reports } from "../types/api";

type NoFilteredReportsProps = {
  allReports: Array<Reports> | undefined;
  setReports: React.Dispatch<React.SetStateAction<Reports[] | undefined>>;
  filterBy: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
};

export default function NoFilteredReports({ values }: { values: NoFilteredReportsProps }) {
  const { allReports, setReports, filterBy, setFilterBy } = values;
  return (
    <List.EmptyView
      title={`No Reports Currently with Status ${filterBy}`}
      icon={Icon.Megaphone}
      description="Press Enter to Change Filter Back to Default"
      actions={
        <ActionPanel>
          <Action
            title="Change Filter to Default"
            icon={Icon.RotateAntiClockwise}
            onAction={() => {
              setReports(allReports);
              setFilterBy("all-status-reports");
            }}
          />
        </ActionPanel>
      }
    />
  );
}
