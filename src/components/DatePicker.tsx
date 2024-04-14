import { Form } from "@raycast/api";

enum DatePickerType {
  Date = "date",
  DateTime = "date_time",
}

export default function DatePicker({ date }: { date: Date }) {
  return <Form.DatePicker id="date" title="Date" defaultValue={date} max={new Date()} type={DatePickerType.DateTime} />;
}
