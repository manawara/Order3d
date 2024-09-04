export type SelectOptionProps = {
  label: string;
  onClick: () => void;
};

export type SelectData = {
  id: number;
  value: string;
};
export type SelectType = {
  name: string;
  placeholder?: string;
  label?: string;
  data: SelectData[];
};
