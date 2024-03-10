import { Fragment, useState } from "react";
import { Common } from "./enum/validation";
import { Reports, StatusReport } from "./types/api";
import { Action, ActionPanel, Form, Icon, PopToRootType, Toast, showHUD, showToast } from "@raycast/api";
import { openstatus } from "./services/OpenStatusSDK";

function UpdateStatusReportForm({ report }: { report: Reports }) {
  const [titleError, setTitleError] = useState<string | undefined>();
  const [messageError, setMessageError] = useState<string | undefined>();
  const { id, status, title } = report;

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
      title: "Updating Status Report",
    });
    await openstatus.updateStatusReport({ ...values, id });
    await showHUD("Status Report Updated 🎉", {
      popToRootType: PopToRootType.Immediate,
      clearRootSearch: true,
    });
  }

  return (
    <Fragment>
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm title="Update Report" onSubmit={onSubmit} icon={Icon.Pencil} />
          </ActionPanel>
        }
      >
        <Form.TextField
          id="title"
          title="Title"
          placeholder="Enter Title of your Outage..."
          defaultValue={title}
          error={titleError}
          onChange={(value) => {
            if (value.length >= 0) {
              setTitleError(undefined);
            }
          }}
          onBlur={validate}
          autoFocus
        ></Form.TextField>
        <Form.Dropdown id="status" title="Status" placeholder="Select Current Status" defaultValue={status}>
          <Form.Dropdown.Item
            title="Investigating"
            value="investigating"
            icon={Icon.MagnifyingGlass}
          ></Form.Dropdown.Item>
          <Form.Dropdown.Item title="Identified" value="identified" icon={Icon.Fingerprint}></Form.Dropdown.Item>
          <Form.Dropdown.Item title="Monitoring" value="monitoring" icon={Icon.Heartbeat}></Form.Dropdown.Item>
          <Form.Dropdown.Item title="Resolved" value="resolved" icon={Icon.Check}></Form.Dropdown.Item>
        </Form.Dropdown>
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
        ></Form.TextArea>
        <Form.DatePicker id="date" title="Date" defaultValue={new Date()} max={new Date()}></Form.DatePicker>
      </Form>
    </Fragment>
  );
}

export default UpdateStatusReportForm;
