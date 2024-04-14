import { StatusReport } from "../types/api";
import { Common } from "../enum/validation";

export function isFormFilled(
  values: StatusReport,
  setTitleError: (value: React.SetStateAction<string | undefined>) => void,
  setMessageError: (value: React.SetStateAction<string | undefined>) => void,
): boolean {
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
