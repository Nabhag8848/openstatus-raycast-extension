import { List } from "@raycast/api";
import { randomUUID } from "crypto";

import { Reports } from "../types/api";
import { DefaultOptionValue, StatusDefaultOption, StatusOption } from "../enum/tag";
import { filterByQuery, filterByStatus } from "../helper";

type StatusFilterDropdownProps = {
  allReports: Array<Reports> | undefined;
  setReports: React.Dispatch<React.SetStateAction<Reports[] | undefined>>;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
  filterBy: string;
  searchQuery: string;
};

export default function StatusFilterDropdown({ values }: { values: StatusFilterDropdownProps }) {
  const { allReports, setReports, setFilterBy, filterBy, searchQuery } = values;
  return (
    <List.Dropdown
      tooltip="Filter By Status"
      onChange={(value) => {
        const reportsWithQuery = filterByQuery({ allReports, query: searchQuery });
        const expectedReports = filterByStatus({ filterBy: value, reportsWithQuery });
        setReports(expectedReports);
        setFilterBy(value);
      }}
      value={filterBy}
      defaultValue={DefaultOptionValue}
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
