import { MenuBarExtra } from "@raycast/api";
import { UnResolvedReports } from "./types/api";
import { useEffect, useState } from "react";
import { openstatus } from "./services/OpenStatusSDK";
import { StatusIcons } from "./enum/tag";

function UnresolvedReports() {
  const [reports, setReports] = useState<UnResolvedReports | undefined>();
  const isLoading = reports === undefined;

  useEffect(
    function () {
      async function onLoad() {
        const statusReports = await openstatus.getAllUnresolvedStatusReport();
        setReports(statusReports);
      }
      onLoad();
    },
    [reports],
  );

  return (
    <MenuBarExtra icon="../assets/OpenStatus.png" tooltip="Unresolved Status Reports" isLoading={isLoading}>
      {reports && reports.investigating.length > 0 && (
        <MenuBarExtra.Section title="Investigating">
          {reports.investigating.map((report) => {
            const { status, title, id } = report;
            return (
              <MenuBarExtra.Item
                title={title}
                key={id}
                icon={StatusIcons[status]}
                onAction={() => {}}
              ></MenuBarExtra.Item>
            );
          })}
        </MenuBarExtra.Section>
      )}
      {reports && reports.identified.length > 0 && (
        <MenuBarExtra.Section title="Identified">
          {reports.identified.map((report) => {
            const { status, title, id } = report;
            return (
              <MenuBarExtra.Item
                title={title}
                key={id}
                icon={StatusIcons[status]}
                onAction={() => {}}
              ></MenuBarExtra.Item>
            );
          })}
        </MenuBarExtra.Section>
      )}
      {reports && reports.monitoring.length > 0 && (
        <MenuBarExtra.Section title="Monitoring">
          {reports.monitoring.map((report) => {
            const { status, title, id } = report;
            return (
              <MenuBarExtra.Item
                title={title}
                key={id}
                icon={StatusIcons[status]}
                onAction={() => {}}
              ></MenuBarExtra.Item>
            );
          })}
        </MenuBarExtra.Section>
      )}
    </MenuBarExtra>
  );
}

export default UnresolvedReports;
