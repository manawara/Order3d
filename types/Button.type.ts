import { LinkProps } from "next/link";
import { ReactNode, ComponentPropsWithoutRef } from "react";

export type ButtonType = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export type ButtonLinkType = Omit<LinkProps, "href"> & {
  children: React.ReactNode;
  link: string;
};
