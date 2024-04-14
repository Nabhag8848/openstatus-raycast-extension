import { List } from "@raycast/api";
import { randomUUID } from "crypto";

import { Reports } from "../types/api";
import { StatusDefaultOption, StatusOption } from "../enum/tag";

export default function StatusFilterDropdown({
  values,
}: {
  values: {
    allReports: Array<Reports> | undefined;
    setReports: React.Dispatch<React.SetStateAction<Reports[] | undefined>>;
    setFilterBy: React.Dispatch<React.SetStateAction<string>>;
    filterBy: string;
  };
}) {
  const { allReports, setReports, setFilterBy, filterBy } = values;
  return (
    <List.Dropdown
      tooltip="Filter By Status"
      onChange={(value) => {
        if (value === "all-status-reports") {
          setReports(allReports);
          return;
        }

        setReports(allReports?.filter((report) => report.status.toString() === value));
        setFilterBy(value);
      }}
      value={filterBy}
      defaultValue="all-status-reports"
    >
      <List.Dropdown.Section title="Filter By Status">
        {StatusOption.map((type) => (
          <List.Dropdown.Item key={randomUUID().toString()} title={type.title} value={type.value} icon={type.icon} />
        ))}
      </List.Dropdown.Section>
      <List.Dropdown.Item
        title={StatusDefaultOption.title}
        value={StatusDefaultOption.value}
        icon={StatusDefaultOption.icon}
      />
    </List.Dropdown>
  );
}
