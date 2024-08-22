import { ReactNode } from "react";

export type TRoute = {
  path?: string;
  element: ReactNode;
  index?: boolean;
};
export type TSidebarLink = {
  key: string;
  label: ReactNode;
  children?: (TSidebarLink|undefined)[];
};
