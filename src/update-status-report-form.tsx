import { Fragment, useState } from "react";
import { Common } from "./enum/validation";
import { Monitor, Reports, StatusPage, StatusReport } from "./types/api";
import { Action, ActionPanel, Form, Icon, PopToRootType, Toast, showHUD, showToast } from "@raycast/api";
import { openstatus } from "./services/OpenStatusSDK";
import { StatusDropdown } from "./components/StatusDropdown";
import { MonitorPicker } from "./components/MonitorPicker";
import { PagePicker } from "./components/PagePicker";
import { isFormFilled } from "./helper/isFormFilled";
import { validateRequiredField } from "./helper/validateRequiredField";

function UpdateStatusReportForm({
  report,
  defaultPages,
  defaultMonitors,
  allMonitors,
  allPages,
}: {
  report: Reports;
  defaultPages: string[];
  defaultMonitors: string[];
  allPages: Array<StatusPage> | undefined;
  allMonitors: Array<Monitor> | undefined;
}) {
  const [titleError, setTitleError] = useState<string | undefined>();
  const [messageError, setMessageError] = useState<string | undefined>();
  const { id, status, title, message, date } = report;

  function isFormComplete(values: StatusReport) {
    return isFormFilled(values, setTitleError, setMessageError);
  }

  function validate(event) {
    validateRequiredField(event, setTitleError, setMessageError);
  }

  async function onSubmit(values: StatusReport) {
    if (!isFormComplete(values)) {
      return;
    }
    await showToast({
      style: Toast.Style.Animated,
      title: "Updating Status Report",
    });
    const isSuccess = await openstatus.updateStatusReport({ ...values, id });

    if (isSuccess) {
      await showHUD("Status Report Updated 🎉", {
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
        />
        <StatusDropdown value={status} />
        <Form.DatePicker id="date" title="Date" defaultValue={new Date(date as string)} max={new Date()} />
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
          defaultValue={message}
        />
        <Form.Separator />
        <PagePicker allPages={allPages} value={defaultPages} />
        <Form.Separator />
        <MonitorPicker allMonitors={allMonitors} value={defaultMonitors} />
      </Form>
    </Fragment>
  );
}

export default UpdateStatusReportForm;
