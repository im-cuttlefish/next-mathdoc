import React, { FC } from "react";
import {
  createCounter,
  mergeThemes,
  mergeClassName,
  RefProvider,
} from "./util";
import { Theme, InternalRefMeta, Creater } from "./types";

export interface TheoremArguments {
  id: string;
  prefix: string;
  delimiter?: string;
  theme?: Theme | Theme[];
}

interface Props {
  name?: string;
  display?: "name" | "counter" | "both";
  className?: string;
}

export const createTheorem: Creater<TheoremArguments> = ({
  id,
  prefix,
  delimiter = "．",
  theme = {},
}) => {
  const merged = mergeThemes(theme);
  const encoded = encodeURIComponent(id);
  const useCounter = createCounter();

  const Theorem: FC<Props> = ({
    name = "",
    display = "both",
    className,
    children,
  }) => {
    const containerStyle = mergeClassName(merged.theoremContainer, className);
    const counter = useCounter();
    const htmlId = `${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };

    if (name) {
      refMeta.name = name;
    }

    return (
      <dl id={htmlId} className={containerStyle} data-mathdoc-id={id}>
        <dt className={merged.theoremTitle} data-mathdoc-id={id}>
          {display !== "name" && `${prefix}${counter}`}
          {display === "both" && name && delimiter}
          {display !== "counter" && name}
        </dt>
        <dd className={merged.theoremContent} data-mathdoc-id={id}>
          <RefProvider refMeta={refMeta}>{children}</RefProvider>
        </dd>
      </dl>
    );
  };

  return { Component: Theorem };
};
