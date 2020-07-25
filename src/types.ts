/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

export type Creater<T extends { id: string } = any> = (
  x: T
) => { Component: FC<any>; Provider?: FC };

export type Theme = { [key in string]?: string };
