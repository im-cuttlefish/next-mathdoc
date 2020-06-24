import React, { useContext, FC } from "react";
import {
  ExerciseContext,
  mergeThemes,
  mergeClassName,
  RefProvider,
} from "./util";
import { Theme, Creater, InternalRefMeta } from "./types";

export interface AnswerArguments {
  id: string;
  prefix: string;
  delimiter?: string;
  theme?: Theme | Theme[];
}

interface Props {
  name?: string;
  display?: "name" | "counter" | "both";
  expansion?: boolean;
  className?: string;
}

export const createAnswer: Creater<AnswerArguments> = ({
  id,
  prefix,
  delimiter = "．",
  theme = {},
}) => {
  const encoded = encodeURIComponent(id);
  const merged = mergeThemes(theme);

  const Answer: FC<Props> = ({
    name,
    display = "both",
    expansion,
    className,
    children,
  }) => {
    const { counter } = useContext(ExerciseContext);
    const containerStyle = mergeClassName(merged.answerContainer, className);
    const title = `${prefix}${counter}`;
    const htmlId = `${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };

    if (name) {
      refMeta.name = name;
    }

    if (expansion) {
      return (
        <details id={htmlId} className={containerStyle} data-mathdoc-id={id}>
          <summary className={merged.answerTitle} data-mathdoc-id={id}>
            {display !== "name" && title}
            {display === "both" && name && delimiter}
            {display !== "counter" && name}
          </summary>
          <RefProvider refMeta={refMeta}>{children}</RefProvider>
        </details>
      );
    }

    return (
      <div id={htmlId} className={containerStyle} data-mathdoc-id={id}>
        <p className={merged.answerTitle} data-mathdoc-id={id}>
          {display !== "name" && title}
          {display === "both" && name && delimiter}
          {display !== "counter" && name}
        </p>
        <RefProvider refMeta={refMeta}>{children}</RefProvider>
      </div>
    );
  };

  return { Component: Answer };
};
