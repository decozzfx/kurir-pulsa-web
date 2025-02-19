import { TextField } from "@mui/material";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface IProps {
  control: Control<any, unknown>;
  label: string;
  placeholder: string;
  inputName: string;
  inputType?: string;
  error?: string;
  disabled?: boolean;
  defaultValue?: string;
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
}

const InputField = ({
  control,
  inputName,
  error,
  disabled,
  label,
  placeholder,
  rules,
  inputType,
  defaultValue = "",
}: IProps) => {
  return (
    <Controller
      name={inputName}
      control={control}
      disabled={disabled}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { ...params } }) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={!!error}
          helperText={error}
          type={inputType}
        />
      )}
    />
  );
};

export default InputField;
