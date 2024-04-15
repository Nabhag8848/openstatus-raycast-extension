import { Action, ActionPanel, Icon, List, environment, useNavigation } from "@raycast/api";
import { useEffect, useState } from "react";
import { randomUUID } from "crypto";

import { StatusFilterDropdown } from "./components";
import { NoFilteredReports, NoStatusReports, ReportDetails, OpenUpdateReportForm } from "./pages";

import { Monitor, Reports, StatusPage } from "./types/api";
import openstatus from "./services/OpenStatusSDK";
import { DefaultOptionValue, StatusListIcons } from "./enum/tag";
import { filterByQuery, filterByStatus } from "./helper";

export default function UpdateStatusReports() {
  const [allReports, setAllReports] = useState<Array<Reports> | undefined>();
  const [allPages, setAllPages] = useState<Array<StatusPage> | undefined>();
  const [allMonitors, setAllMonitors] = useState<Array<Monitor> | undefined>();
  const { push } = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reports, setReports] = useState<Array<Reports>>();
  const isEmptyView = allReports && allReports.length < 1;
  const isNonEmptyView = reports && reports.length > 0;
  const [filterBy, setFilterBy] = useState<string>(DefaultOptionValue);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
      const {
        allPages,
        report,
        allMonitors,
      }: { report: Reports; allPages: Array<StatusPage>; allMonitors: Array<Monitor> } =
        environment.launchContext.payload;

      push(OpenUpdateReportForm({ report, allMonitors, allPages }));
    }
  }, []);

  function handleSearchQuery(query: string) {
    const reportsWithQuery = filterByQuery({ allReports, query });
    const expectedReports = filterByStatus({ filterBy, reportsWithQuery });

    setReports(expectedReports);
    setSearchQuery(query);
  }

  return (
    <List
      isLoading={isLoading}
      navigationTitle="Update Status Report"
      searchBarPlaceholder="Search Status Reports"
      isShowingDetail={isNonEmptyView}
      searchBarAccessory={
        !isEmptyView && !isLoading ? (
          <StatusFilterDropdown values={{ setReports, allReports, setFilterBy, filterBy, searchQuery }} />
        ) : null
      }
      searchText={searchQuery}
      onSearchTextChange={handleSearchQuery}
      throttle
    >
      {isNonEmptyView ? (
        <List.Section title="Select Report to Update">
          {reports.map((report) => {
            const { id, status, title } = report;

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
                        push(OpenUpdateReportForm({ report, allMonitors, allPages }));
                        setIsLoading(false);
                      }}
                    />
                  </ActionPanel>
                }
                key={randomUUID().toString()}
                detail={<ReportDetails report={report} allPages={allPages} allMonitors={allMonitors} />}
              />
            );
          })}
        </List.Section>
      ) : isEmptyView ? (
        <NoStatusReports />
      ) : (
        <NoFilteredReports values={{ setReports, allReports, filterBy, setFilterBy, setSearchQuery, searchQuery }} />
      )}
    </List>
  );
}
