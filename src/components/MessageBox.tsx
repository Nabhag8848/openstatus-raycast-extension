import { Form } from "@raycast/api";

type MessageBoxProps = {
  messageError?: string;
  setMessageError: React.Dispatch<React.SetStateAction<string | undefined>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate: (event: any) => void;
  value?: string;
};

export default function MessageBox({ values }: { values: MessageBoxProps }) {
  const { messageError, setMessageError, validate, value } = values;

  return (
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
      defaultValue={value}
    />
  );
}
