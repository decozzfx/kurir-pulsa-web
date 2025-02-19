import { Autocomplete, TextField } from "@mui/material";
import { ReactNode } from "react";
import { Controller, Control } from "react-hook-form";

interface IProps {
  control: Control<any, unknown>;
  label: string;
  placeholder: string;
  inputName: string;
  inputType?: string;
  error?: string;
  icon?: ReactNode;
  disabled?: boolean;
  options: Record<string, any>[];
}

const Dropdown = ({
  control,
  placeholder,
  inputName,
  label,
  error,
  disabled,
  options,
}: IProps) => {
  return (
    <Controller
      name={inputName}
      control={control}
      disabled={disabled}
      render={({ field: { ...rest } }) => (
        <Autocomplete
          {...rest}
          options={options}
          getOptionLabel={(option) => option.value || ""}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, data) => rest.onChange(data)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error}
            />
          )}
        />
      )}
    />
  );
};

export default Dropdown;
