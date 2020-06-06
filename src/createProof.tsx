import React, { FC } from "react";
import { ProofTheme, StyleWithTheme } from "./types";
import { applyTheme } from "./internal/applyTheme";

interface Mark {
  startMark?: string;
  endMark?: string;
}

type Style = StyleWithTheme<ProofTheme>;

export const createProof = ({
  startMark = "証明．",
  endMark = "∎",
  ...style
}: Mark & Style) => {
  const applied = applyTheme(style);

  const Proof: FC = ({ children }) => (
    <div style={applied.container}>
      <span style={applied.start}>{startMark}</span>
      {children}
      <span className="end-of-proof" style={applied.end}>
        {endMark}
      </span>
      <style jsx>{`
        .end-of-proof {
          float: right;
        }
      `}</style>
    </div>
  );

  return Proof;
};
