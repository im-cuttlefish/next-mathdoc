import React, { FC } from "react";
import { Theme, Creater } from "./types";
import { mergeThemes, mergeClassNames } from "./util";

export interface ProofArguments {
  id: string;
  startMark?: string;
  endMark?: string;
  theme?: Theme | Theme[];
}

interface Props {
  className: string;
}

const classNames = {
  proofContainer: "mathdoc-proof-container",
  proofContent: "mathdoc-proof-content",
  proofStartMark: "mathdoc-proof-start-mark",
  proofEndMark: "mathdoc-proof-end-mark",
};

export const createProof: Creater<ProofArguments> = ({
  id,
  startMark = "Proof.",
  endMark = "∎",
  theme = {},
}) => {
  const merged = mergeThemes(classNames, theme);

  const Proof: FC<Props> = ({ className, children }) => {
    const containerStyle = mergeClassNames(merged.proofContainer, className);

    return (
      <div className={containerStyle} data-mathdoc-id={id}>
        <div className={merged.proofContent}>
          <span className={merged.proofStartMark} data-mathdoc-id={id}>
            {startMark}
          </span>
          {children}
          <span className={merged.proofEndMark} data-mathdoc-id={id}>
            {endMark}
          </span>
        </div>
      </div>
    );
  };

  return { Component: Proof };
};
