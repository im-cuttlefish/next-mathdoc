import { CSSProperties } from "react";

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

// Proof
export interface ProofMark {
  start: string;
  end: string;
}

// Theme
export type Theme<T extends string = string> = { [key in T]?: CSSProperties };

export type StyleWithTheme<T extends Theme> = T & { theme?: T };

export type TheoremTheme = Theme<"container" | "title" | "content">;

export type ProofTheme = Theme<"container" | "start" | "end">;
