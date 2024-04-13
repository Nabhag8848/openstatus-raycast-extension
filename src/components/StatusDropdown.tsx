import { Form, Icon } from "@raycast/api";
import { Status } from "../enum/tag";

export function StatusDropdown({ value }: { value?: Status }) {
  return (
    <Form.Dropdown id="status" title="Status" placeholder="Select Current Status" defaultValue={value}>
      <Form.Dropdown.Item title="Investigating" value="investigating" icon={Icon.MagnifyingGlass} />
      <Form.Dropdown.Item title="Identified" value="identified" icon={Icon.Fingerprint} />
      <Form.Dropdown.Item title="Monitoring" value="monitoring" icon={Icon.Heartbeat} />
      <Form.Dropdown.Item title="Resolved" value="resolved" icon={Icon.Check} />
    </Form.Dropdown>
  );
}
