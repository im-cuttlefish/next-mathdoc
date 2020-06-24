import React, { FC } from "react";
import { Theme, Creater } from "./types";
import { mergeThemes, mergeClassName } from "./util";

export interface ProofArguments {
  id: string;
  startMark?: string;
  endMark?: string;
  theme?: Theme | Theme[];
}

interface Props {
  className: string;
}

export const createProof: Creater<ProofArguments> = ({
  id,
  startMark = "Proof.",
  endMark = "∎",
  theme = {},
}) => {
  const merged = mergeThemes(theme);

  const Proof: FC<Props> = ({ className, children }) => {
    const containerStyle = mergeClassName(merged.proofContainer, className);

    return (
      <div className={containerStyle} data-mathdoc-id={id}>
        <span className={merged.proofStartMark} data-mathdoc-id={id}>
          {startMark}
        </span>
        {children}
        <span className={merged.proofEndMark} data-mathdoc-id={id}>
          {endMark}
        </span>
      </div>
    );
  };

  return { Component: Proof };
};
