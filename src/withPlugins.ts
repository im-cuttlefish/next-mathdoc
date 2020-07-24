/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, createElement, Fragment } from "react";
import { createRef, RefArguments } from "./ref";
import {
  createRefContainer,
  RefContainerArguments,
} from "./createRefContainer";
import { createTheorem, TheoremArguments } from "./createTheorem";
import { createProof, ProofArguments } from "./createProof";
import { createQuestion, createAnswer, QuestionArguments } from "./exercise";
import { Creater } from "./types";

type Entry<T> = { [U in keyof T]: [U, T[U]] }[keyof T];
type Each<T> = { [U in keyof T]: { [V in U]: T[U] } }[keyof T];

type DP = {
  $ref: Creater<RefArguments>;
  $refContainer: Creater<RefContainerArguments>;
  $theorem: Creater<TheoremArguments>;
  $proof: Creater<ProofArguments>;
  $question: Creater<QuestionArguments>;
  $answer: Creater<QuestionArguments>;
};

const defaultPlugins: DP = {
  $ref: createRef,
  $refContainer: createRefContainer,
  $theorem: createTheorem,
  $proof: createProof,
  $question: createQuestion,
  $answer: createAnswer,
};

export const withPlugins = <T extends { [x: string]: Creater }>(
  plugins: T extends Each<DP> ? never : T
) => {
  type A = Entry<{ [V in keyof DP]: Parameters<DP[V]>[0] }>;
  type B = Entry<{ [V in keyof T]: Parameters<T[V]>[0] }>;
  type Env = { [x in string]?: A | B | ReturnType<Creater> };

  const allPlugins = { ...defaultPlugins, ...plugins } as any;

  const createComponent = (arg: A | B) => {
    return allPlugins[arg[0]](arg[1]) as ReturnType<Creater>;
  };

  return <U extends Env>(arg: U) => {
    const map = new Map<keyof U, ReturnType<Creater>>();

    Object.entries(arg).forEach(([key, value]) => {
      if (!value) {
        throw new Error("next-mathdoc: Don't specify undefind explicitly.");
      }

      map.set(key, Array.isArray(value) ? createComponent(value) : value);
    });

    const components = [...map.entries()].reduce(
      (prev, [key, value]) => ({ ...prev, [key]: value.Component }),
      {}
    ) as { [x in keyof U]: FC };

    const Provider: FC = ({ children }) =>
      [...map.values()]
        .filter((x): x is Required<ReturnType<Creater>> => "Provider" in x)
        .reduce(
          (tree, { Provider }) => createElement(Provider, null, tree),
          createElement(Fragment, null, children)
        );

    return [components, Provider] as const;
  };
};
