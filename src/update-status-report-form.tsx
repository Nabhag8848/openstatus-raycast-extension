import { Action, ActionPanel, Form, Icon, PopToRootType, Toast, showHUD, showToast } from "@raycast/api";
import { Fragment, useState } from "react";

import { Monitor, Reports, StatusPage, StatusReport } from "./types/api";
import openstatus from "./services/OpenStatusSDK";

import { isFormFilled, validateRequiredField } from "./helper";
import { StatusDropdown, MonitorPicker, PagePicker, MessageBox, TitleInput, DatePicker } from "./components";

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
        <TitleInput values={{ value: title, titleError, setTitleError, validate }} />
        <StatusDropdown value={status} />
        <DatePicker date={new Date(date as string)} />
        <MessageBox values={{ messageError, setMessageError, validate, value: message }} />
        <Form.Separator />
        <PagePicker allPages={allPages} value={defaultPages} />
        <Form.Separator />
        <MonitorPicker allMonitors={allMonitors} value={defaultMonitors} />
      </Form>
    </Fragment>
  );
}

export default UpdateStatusReportForm;
