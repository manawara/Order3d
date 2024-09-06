export type SelectOptionProps = {
  label: string;
  onClick: () => void;
};

export type SelectData = {
  id?: number | string;
  value: string | null;
};
export type SelectType = {
  name: string;
  placeholder?: string;
  label?: string;
  data: SelectData[];
};
