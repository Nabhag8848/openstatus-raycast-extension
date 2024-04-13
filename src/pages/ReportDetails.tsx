import { Color, List } from "@raycast/api";
import { getTimeAgoFromISO } from "../helper/getTimeAgoFromISO";
import { MonitorColors, StatusMessage } from "../enum/tag";
import { getDefaultMonitors, getDefaultPages } from "../helper/getDefault";
import { Monitor, Reports, StatusPage } from "../types/api";

export function ReportDetails({
  report,
  allPages,
  allMonitors,
}: {
  report: Reports;
  allPages: Array<StatusPage> | undefined;
  allMonitors: Array<Monitor> | undefined;
}) {
  const { pages_id, monitors_id, status, title, message, date } = report;
  const pages = getDefaultPages(allPages, pages_id);
  const monitors = getDefaultMonitors(allMonitors, monitors_id);
  const markdown = `# 📃 Title \n ${title}\n # 💥 Message \n ${message}`;
  const isConnectToPages = pages && pages.length;
  const isConnectToMonitors = monitors && monitors.length;
  return (
    <List.Item.Detail
      markdown={markdown}
      metadata={
        <List.Item.Detail.Metadata>
          <List.Item.Detail.Metadata.TagList title="Current Status">
            <List.Item.Detail.Metadata.TagList.Item
              text={StatusMessage[status].value}
              color={StatusMessage[status].color}
            />
          </List.Item.Detail.Metadata.TagList>
          <List.Item.Detail.Metadata.Separator />
          <List.Item.Detail.Metadata.TagList title="Pages">
            {isConnectToPages ? (
              pages.map((page) => {
                return <List.Item.Detail.Metadata.TagList.Item text={page.title} key={page.id} />;
              })
            ) : (
              <List.Item.Detail.Metadata.TagList.Item text="None" color={Color.Magenta} />
            )}
          </List.Item.Detail.Metadata.TagList>
          <List.Item.Detail.Metadata.Separator />
          <List.Item.Detail.Metadata.TagList title="Monitors">
            {isConnectToMonitors ? (
              monitors.map((monitor) => {
                return (
                  <List.Item.Detail.Metadata.TagList.Item
                    text={monitor.name}
                    key={monitor.id}
                    color={monitor.active ? MonitorColors.true : MonitorColors.false}
                  />
                );
              })
            ) : (
              <List.Item.Detail.Metadata.TagList.Item text="None" color={Color.Magenta} />
            )}
          </List.Item.Detail.Metadata.TagList>
          <List.Item.Detail.Metadata.Separator />
          <List.Item.Detail.Metadata.Label
            title="Started"
            text={{ value: getTimeAgoFromISO(date as string), color: Color.SecondaryText }}
          />
          <List.Item.Detail.Metadata.Separator />
        </List.Item.Detail.Metadata>
      }
    />
  );
}
