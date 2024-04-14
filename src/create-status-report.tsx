import { Action, ActionPanel, Form, Icon, PopToRootType, Toast, showHUD, showToast } from "@raycast/api";
import { useEffect, useState } from "react";

import openstatus from "./services/OpenStatusSDK";
import { Monitor, StatusPage, StatusReport } from "./types/api";

import { isFormFilled, validateRequiredField } from "./helper";
import { StatusDropdown, MonitorPicker, PagePicker, MessageBox, TitleInput, DatePicker } from "./components";

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
      <TitleInput values={{ titleError, setTitleError, validate }} />
      <StatusDropdown />
      <DatePicker date={new Date()} />
      <MessageBox values={{ messageError, setMessageError, validate }} />
      <Form.Separator />
      <PagePicker allPages={pages} />
      <Form.Separator />
      <MonitorPicker allMonitors={monitors} />
    </Form>
  );
}

export default CreateStatusReport;
