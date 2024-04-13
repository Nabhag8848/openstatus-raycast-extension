import { Form } from "@raycast/api";
import { Fragment } from "react";
import { MonitorsIcons } from "../enum/tag";
import { Monitor } from "../types/api";

export function MonitorPicker({ allMonitors, value }: { allMonitors?: Array<Monitor>; value?: string[] }) {
  return (
    <Fragment>
      <Form.TagPicker id="monitors_id" title="Monitors" placeholder="Select Monitors" defaultValue={value}>
        {allMonitors &&
          allMonitors.map((monitor) => {
            const { id, name, active } = monitor;
            return (
              <Form.TagPicker.Item
                value={id.toString()}
                title={name}
                key={id}
                icon={MonitorsIcons[active ? "true" : "false"]}
              />
            );
          })}
      </Form.TagPicker>
      <Form.Description text="Select the monitors that you want to refer the incident to" />
    </Fragment>
  );
}
