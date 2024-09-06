export type SelectOptionProps = {
  label: string | null;
  onClick: () => void;
};

export type SelectData = {
  id?: number | string;
  value: string;
};
export type SelectType = {
  name: string;
  value?: string;
  onChange: (item: string | null) => void;
  placeholder?: string;
  label?: string;
  data: SelectData[];
};
