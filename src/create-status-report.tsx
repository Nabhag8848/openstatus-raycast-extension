import { Action, ActionPanel, Form, Icon, PopToRootType, Toast, showHUD, showToast } from "@raycast/api";
import { useEffect, useState } from "react";

import { openstatus } from "./services/OpenStatusSDK";
import { Common } from "./enum/validation";

import { Monitor, StatusPage, StatusReport } from "./types/api";
import { MonitorsIcons } from "./enum/tag";

function CreateStatusReport() {
  const [titleError, setTitleError] = useState<string | undefined>();
  const [messageError, setMessageError] = useState<string | undefined>();
  const [pages, setPages] = useState<Array<StatusPage> | undefined>();
  const [monitors, setMonitors] = useState<Array<Monitor> | undefined>();

  useEffect(
    function () {
      async function onLoad() {
        const [statusPages, allMonitors] = await Promise.all([
          openstatus.getAllStatusPage(),
          openstatus.getAllMonitors(),
        ]);
        setPages(statusPages);
        setMonitors(allMonitors);
      }

      if (pages || monitors) return;
      onLoad();
    },
    [pages, monitors],
  );

  function isFormComplete(values: StatusReport) {
    let result: boolean = true;
    const { title, message } = values;

    if (title.length === 0) {
      setTitleError(Common.FORM_VALIDATION);
      result = false;
    }

    if (message.length === 0) {
      setMessageError(Common.FORM_VALIDATION);
      result = false;
    }

    return result;
  }

  function validate(event) {
    const { value, id } = event.target;

    if (value && value.length > 0) {
      switch (id) {
        case "title": {
          setTitleError(undefined);
          break;
        }
        case "message": {
          setMessageError(undefined);
          break;
        }
      }

      return;
    }

    switch (id) {
      case "title": {
        setTitleError(Common.FORM_VALIDATION);
        break;
      }
      case "message": {
        setMessageError(Common.FORM_VALIDATION);
        break;
      }
    }
  }

  async function onSubmit(values: StatusReport) {
    if (!isFormComplete(values)) {
      return;
    }

    await showToast({
      style: Toast.Style.Animated,
      title: "Creating Status Report",
    });

    const isSuccess = await openstatus.createStatusReport(values);

    if (isSuccess) {
      await showHUD("Status Report Created 🎉", {
        popToRootType: PopToRootType.Immediate,
        clearRootSearch: true,
      });

      return;
    }

    await showToast({
      style: Toast.Style.Failure,
      title: "Something Went Wrong",
      message: "Please try again. If the issue persists, please contact us",
    });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Report" onSubmit={onSubmit} icon={Icon.NewDocument} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="title"
        title="Title"
        placeholder="Enter Title of your Outage..."
        error={titleError}
        onChange={(value) => {
          if (value.length) {
            setTitleError(undefined);
          }
        }}
        onBlur={validate}
        autoFocus
      />
      <Form.Dropdown id="status" title="Status" placeholder="Select Current Status">
        <Form.Dropdown.Item title="Investigating" value="investigating" icon={Icon.MagnifyingGlass} />
        <Form.Dropdown.Item title="Identified" value="identified" icon={Icon.Fingerprint} />
        <Form.Dropdown.Item title="Monitoring" value="monitoring" icon={Icon.Heartbeat} />
        <Form.Dropdown.Item title="Resolved" value="resolved" icon={Icon.Check} />
      </Form.Dropdown>
      <Form.DatePicker id="date" title="Date" defaultValue={new Date()} max={new Date()} />
      <Form.TextArea
        id="message"
        title="Message"
        placeholder="We are encountering..."
        error={messageError}
        onChange={(value) => {
          if (value.length) {
            setMessageError(undefined);
          }
        }}
        onBlur={validate}
      />
      <Form.Separator />
      <Form.TagPicker id="pages_id" title="Pages" placeholder="Select Pages">
        {pages &&
          pages.map((page) => {
            const { id, title } = page;
            return <Form.TagPicker.Item value={id.toString()} title={title} key={id} icon={Icon.Window} />;
          })}
      </Form.TagPicker>
      <Form.Description text="Select the pages that you want to refer the incident to" />
      <Form.Separator />
      <Form.TagPicker id="monitors_id" title="Monitors" placeholder="Select Monitors">
        {monitors &&
          monitors.map((monitor) => {
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
    </Form>
  );
}

export default CreateStatusReport;
