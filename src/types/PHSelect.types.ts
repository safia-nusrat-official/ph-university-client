export type SelectOptions = { value: string; label: string }[];
export type SelectProps = {
  name: string;
  label: string;
  options: SelectOptions;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: any;
  required?: boolean;
};
