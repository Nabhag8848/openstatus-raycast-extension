import { Action, ActionPanel, Form, Icon, PopToRootType, showHUD } from "@raycast/api";

function CreateStatusReport() {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Create Report"
            onSubmit={async (values) => {
              console.log("onSubmit", values);
              // Todo -> Make Network Request
              await showHUD("Status Report Created 🎉", {
                popToRootType: PopToRootType.Immediate,
                clearRootSearch: true,
              });
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" placeholder="Enter Title of your Outage..." autoFocus></Form.TextField>
      <Form.Dropdown id="status" title="Status" placeholder="Select Current Status">
        <Form.Dropdown.Item
          title="Investigating"
          value="investigating"
          icon={Icon.MagnifyingGlass}
        ></Form.Dropdown.Item>
        <Form.Dropdown.Item title="Identified" value="identified" icon={Icon.Fingerprint}></Form.Dropdown.Item>
        <Form.Dropdown.Item title="Monitoring" value="monitoring" icon={Icon.Heartbeat}></Form.Dropdown.Item>
        <Form.Dropdown.Item title="Resolved" value="resolved" icon={Icon.Check}></Form.Dropdown.Item>
      </Form.Dropdown>
      <Form.DatePicker id="date" title="Date" defaultValue={new Date()} max={new Date()}></Form.DatePicker>
      <Form.TextArea id="message" title="Message" placeholder="We are encountering..."></Form.TextArea>
    </Form>
  );
}

export default CreateStatusReport;
