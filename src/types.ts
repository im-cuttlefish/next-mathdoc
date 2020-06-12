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

// Theme
type Theorem = "theoremContainer" | "theoremTitle" | "theoremContent";

type Proof = "proofContainer" | "proofStartMark" | "proofEndMark";

export type Theme = { [key in Theorem | Proof]?: string };
