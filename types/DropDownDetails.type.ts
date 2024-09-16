import { ReactElement } from "react";

export interface DropDownWithPropsProps {
  [key: string]: any;
  id: string | number | null;
  onDelete: (id: number | string) => void;
}

export interface DropDownItem {
  link: string;
  name: string;
  icon: ReactElement;
}
