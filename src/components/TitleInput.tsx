import { Form } from "@raycast/api";

type TitleInputProps = {
  titleError?: string;
  setTitleError: React.Dispatch<React.SetStateAction<string | undefined>>;
  validate: (event: any) => void;
  value?: string;
};

export default function TitleInput({ values }: { values: TitleInputProps }) {
  const { titleError, validate, value, setTitleError } = values;
  return (
    <Form.TextField
      id="title"
      title="Title"
      placeholder="Enter Title of your Outage..."
      defaultValue={value}
      error={titleError}
      onChange={(value) => {
        if (value.length >= 0) {
          setTitleError(undefined);
        }
      }}
      onBlur={validate}
      autoFocus
    />
  );
}
