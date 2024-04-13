import { Form, Icon } from "@raycast/api";
import { Fragment } from "react";
import { StatusPage } from "../types/api";

export function PagePicker({ allPages, value }: { allPages?: Array<StatusPage>; value?: string[] }) {
  return (
    <Fragment>
      <Form.TagPicker id="pages_id" title="Pages" placeholder="Select Pages" defaultValue={value}>
        {allPages &&
          allPages.map((page) => {
            const { id, title } = page;
            return <Form.TagPicker.Item value={id.toString()} title={title} key={id} icon={Icon.Window} />;
          })}
      </Form.TagPicker>
      <Form.Description text="Select the pages that you want to refer the incident to" />
    </Fragment>
  );
}
