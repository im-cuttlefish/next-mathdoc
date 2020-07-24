/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

// general
export type Creater<T extends { id: string } = any> = (
  x: T
) => { Component: FC<any>; Provider?: FC };

// Theme
type Ref = "refLink" | "refExternalLink" | "refInternalLink";

type Theorem = "theoremContainer" | "theoremTitle" | "theoremContent";

type Proof =
  | "proofContainer"
  | "proofStartMark"
  | "proofEndMark"
  | "proofContent";

type Question = "questionContainer" | "questionTitle" | "questionContent";

type Answer = "answerContainer" | "answerTitle" | "answerContent";

type ClassName = Ref | Theorem | Proof | Question | Answer;

export type Theme = { [key in ClassName]?: string };
