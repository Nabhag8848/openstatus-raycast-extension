import { List } from "@raycast/api";
import { randomUUID } from "crypto";

import { Reports } from "../types/api";

export default function StatusFilterDropdown({
  allReports,
  setReports,
}: {
  allReports: Array<Reports> | undefined;
  setReports: React.Dispatch<React.SetStateAction<Reports[] | undefined>>;
}) {
  const StatusOption = [
    {
      title: "All Status Reports",
      value: "all-status-reports",
    },
    {
      title: "Investigating",
      value: "investigating",
    },
    {
      title: "Monitoring",
      value: "monitoring",
    },
    {
      title: "Identified",
      value: "identified",
    },
    {
      title: "Resolved",
      value: "resolved",
    },
  ];
  return (
    <List.Dropdown
      tooltip="Filter By Status"
      onChange={(value) => {
        if (value === "all-status-reports") {
          setReports(allReports);
          return;
        }

        setReports(allReports?.filter((report) => report.status.toString() === value));
      }}
      defaultValue="all-status-reports"
    >
      <List.Dropdown.Section title="Filter By Status">
        {StatusOption.map((type) => (
          <List.Dropdown.Item key={randomUUID().toString()} title={type.title} value={type.value} />
        ))}
      </List.Dropdown.Section>
    </List.Dropdown>
  );
}
