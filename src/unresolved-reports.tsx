import { Icon, MenuBarExtra, open, openExtensionPreferences } from "@raycast/api";
import { useEffect, useState } from "react";

import openstatus from "./services/OpenStatusSDK";
import { UnResolvedReports } from "./types/api";

import { MenuBarSection } from "./components";

function UnresolvedReports() {
  const [reports, setReports] = useState<UnResolvedReports | undefined>();
  const isLoading = reports === undefined;

  useEffect(
    function () {
      async function onLoad() {
        const statusReports = await openstatus.getAllUnresolvedStatusReport();
        setReports(statusReports);
      }
      if (reports) return;
      onLoad();
    },
    [reports],
  );

  return (
    <MenuBarExtra icon="../assets/OpenStatus.png" tooltip="Unresolved Status Reports" isLoading={isLoading}>
      {reports && reports.investigating.length > 0 && (
        <MenuBarSection reports={reports.investigating} sectionTitle="Investigating" />
      )}
      {reports && reports.identified.length > 0 && (
        <MenuBarSection reports={reports.identified} sectionTitle="Identified" />
      )}
      {reports && reports.monitoring.length > 0 && (
        <MenuBarSection reports={reports.monitoring} sectionTitle="Monitoring" />
      )}
      <MenuBarExtra.Section title="Utilities">
        <MenuBarExtra.Item
          title="Dashboard"
          icon={Icon.AppWindow}
          shortcut={{ modifiers: ["cmd", "shift"], key: "d" }}
          onAction={() => open("https://www.openstatus.dev/app/")}
        />
        <MenuBarExtra.Item
          title="Preferences"
          icon={Icon.Keyboard}
          shortcut={{ modifiers: ["cmd"], key: "," }}
          onAction={async () => await openExtensionPreferences()}
        />
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}

export default UnresolvedReports;
