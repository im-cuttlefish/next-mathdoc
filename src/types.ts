/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { RefArguments } from "./createRef";
import { RefContainerArguments } from "./createRefContainer";
import { TheoremArguments } from "./createTheorem";
import { ProofArguments } from "./createProof";
import { QuestionArguments } from "./createQuestion";
import { AnswerArguments } from "./createAnswer";

// general
export type Creater<T extends { id: string } = any> = (
  x: T
) => { Component: FC<any>; Provider?: FC };

export type MathdocRules =
  | ["ref", RefArguments]
  | ["refContainer", RefContainerArguments]
  | ["theorem", TheoremArguments]
  | ["proof", ProofArguments]
  | ["question", QuestionArguments]
  | ["answer", AnswerArguments];

export type MathdocEnvironment = Readonly<
  { [x in string]?: MathdocRules | ReturnType<Creater> }
>;

// Ref
export interface InternalRefMeta {
  isExternal: false;
  htmlId: string;
  counter: number;
  name?: string;
}

export interface ExternalRefMeta {
  isExternal: true;
  path: string;
  name: string;
}

export type RefMeta = InternalRefMeta | ExternalRefMeta;

// Exercise
export interface ExerciseStore {
  counter: number;
}

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
