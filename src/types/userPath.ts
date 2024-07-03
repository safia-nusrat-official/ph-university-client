import { ReactNode } from "react";

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  index?: boolean;
  children?: TUserPath[];
};
