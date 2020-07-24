import React, { FC, useMemo } from "react";
import { mergeThemes, mergeClassName, withCounter } from "../util";
import { RefProvider, InternalRefMeta } from "../ref";
import { ExerciseProvider } from "./ExcerciseProvider";
import { Theme, Creater } from "../types";

export interface QuestionArguments {
  id: string;
  prefix: string;
  delimiter?: string;
  theme?: Theme | Theme[];
}

interface Props {
  name?: string;
  display?: "name" | "counter" | "both";
  className?: string;
  counter: number;
}

export const createQuestion: Creater<QuestionArguments> = ({
  id,
  prefix,
  delimiter = "．",
  theme = {},
}) => {
  const encoded = encodeURIComponent(id);
  const merged = mergeThemes(theme);

  const Question: FC<Props> = ({
    name,
    display = "both",
    className,
    children,
    counter,
  }) => {
    const containerStyle = mergeClassName(merged.answerContainer, className);
    const htmlId = `${encoded}-${counter}`;

    const refMeta = useMemo(() => {
      const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };
      return name ? { ...refMeta, name } : refMeta;
    }, [name]);

    return (
      <div id={htmlId} className={containerStyle} data-mathdoc-id={id}>
        <p className={merged.questionTitle} data-mathdoc-id={id}>
          {display !== "name" && `${prefix}${counter}`}
          {display === "both" && name && delimiter}
          {display !== "counter" && name}
        </p>
        <div className={merged.questionContent}>
          <RefProvider refMeta={refMeta}>
            <ExerciseProvider counter={counter}>{children}</ExerciseProvider>
          </RefProvider>
        </div>
      </div>
    );
  };

  return { Component: withCounter(id, Question) };
};