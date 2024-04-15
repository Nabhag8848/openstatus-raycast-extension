import { Icon, MenuBarExtra, open, openExtensionPreferences } from "@raycast/api";
import { useEffect, useState } from "react";

import openstatus from "./services/OpenStatusSDK";
import { UnResolvedReports } from "./types/api";
import { Api, MenuBarIcon, Shortcuts } from "./enum/api";

import { MenuBarItem } from "./components";

function UnresolvedReports() {
  const [reports, setReports] = useState<UnResolvedReports | undefined>();
  const isLoading = reports === undefined;
  const InReports = reports && reports.investigating.length > 0;
  const IdReports = reports && reports.identified.length > 0;
  const MoReports = reports && reports.monitoring.length > 0;

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
    <MenuBarExtra icon={MenuBarIcon} tooltip="Unresolved Status Reports" isLoading={isLoading} title="OpenStatus">
      <MenuBarExtra.Section title="Unresolved Reports">
        {InReports && <MenuBarItem reports={reports.investigating} />}
        {IdReports && <MenuBarItem reports={reports.identified} />}
        {MoReports && <MenuBarItem reports={reports.monitoring} />}
      </MenuBarExtra.Section>
      <MenuBarExtra.Section title="Utilities">
        <MenuBarExtra.Item
          title="Dashboard"
          icon={Icon.AppWindow}
          shortcut={Shortcuts.dashboard}
          onAction={() => open(Api.DASHBOARD_URL)}
        />
        <MenuBarExtra.Item
          title="Preferences"
          icon={Icon.Keyboard}
          shortcut={Shortcuts.preferences}
          onAction={async () => await openExtensionPreferences()}
        />
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}

export default UnresolvedReports;
