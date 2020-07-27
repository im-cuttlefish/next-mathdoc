import React, { useContext, FC } from "react";
import { mergeClassNames, mergeThemes } from "../util";
import { RefProvider, InternalRefMeta } from "../ref";
import { ExerciseContext } from "./ExerciseContext";
import { Theme, Creater } from "../types";

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

const classNames = {
  answerContainer: "mathdoc-answer-container",
  answerContent: "mathdoc-answer-content",
  answerTitle: "mathdoc-answer-title",
};

export const createAnswer: Creater<AnswerArguments> = ({
  id,
  prefix,
  delimiter = "．",
  theme = {},
}) => {
  const encoded = encodeURIComponent(id);
  const merged = mergeThemes(classNames, theme);

  const Answer: FC<Props> = ({
    name,
    display = "both",
    expansion,
    className,
    children,
  }) => {
    const { counter } = useContext(ExerciseContext);
    const containerStyle = mergeClassNames(merged.answerContainer, className);
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
          <div className={merged.answerContent}>
            <RefProvider refMeta={refMeta}>{children}</RefProvider>
          </div>
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
        <div className={merged.answerContent}>
          <RefProvider refMeta={refMeta}>{children}</RefProvider>
        </div>
      </div>
    );
  };

  return { Component: Answer };
};
