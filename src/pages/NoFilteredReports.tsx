import { Action, ActionPanel, Icon, List } from "@raycast/api";

import { Reports } from "../types/api";
import { DefaultOptionValue } from "../enum/tag";
import { filterByStatus, filterByQuery } from "../helper";
import { Shortcuts } from "../enum/api";

type NoFilteredReportsProps = {
  allReports: Array<Reports> | undefined;
  setReports: React.Dispatch<React.SetStateAction<Reports[] | undefined>>;
  filterBy: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
};

export default function NoFilteredReports({ values }: { values: NoFilteredReportsProps }) {
  const { allReports, setReports, setFilterBy, setSearchQuery, filterBy, searchQuery } = values;
  return (
    <List.EmptyView
      title={`No Reports Matching Filters`}
      icon={Icon.Megaphone}
      description="Press Cmd + Enter to Change Filters back to Default"
      actions={
        <ActionPanel>
          <Action
            title="Clear Search Query"
            icon={Icon.Keyboard}
            onAction={() => {
              const expectedReports = filterByStatus({ filterBy, reportsWithQuery: allReports as Array<Reports> });
              setReports(expectedReports);
              setSearchQuery("");
            }}
          />
          <Action
            title="Change to Default"
            icon={Icon.RotateAntiClockwise}
            onAction={() => {
              setReports(allReports);
              setFilterBy(DefaultOptionValue);
              setSearchQuery("");
            }}
          />
          <Action
            title="Change Status to Default"
            icon={Icon.CircleFilled}
            onAction={() => {
              const expectedReports = filterByQuery({ allReports: allReports as Array<Reports>, query: searchQuery });
              setReports(expectedReports);
              setFilterBy(DefaultOptionValue);
            }}
            shortcut={Shortcuts.status}
          />
        </ActionPanel>
      }
    />
  );
}
