import { TextField } from "@mui/material";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface IProps {
  control: Control<any, unknown>;
  label: string;
  placeholder: string;
  inputName: string;
  inputType?: string;
  error?: string;
  disabled?: boolean;
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
}

const NumericField = ({
  control,
  inputName,
  error,
  disabled,
  label,
  placeholder,
  rules,
}: IProps) => {
  return (
    <Controller
      name={inputName}
      control={control}
      disabled={disabled}
      rules={rules}
      render={({ field: { onChange, ...rest } }) => (
        <NumericFormat
          {...rest}
          label={label}
          placeholder={placeholder}
          fullWidth
          customInput={TextField}
          thousandSeparator=","
          allowNegative={false}
          decimalScale={8}
          onValueChange={({ value }) => onChange(value ?? "")}
          error={Boolean(error)}
          disabled={disabled}
          helperText={error}
          InputProps={{
            sx: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
        />
      )}
    />
  );
};

export default NumericField;
