// for normal usage
export { createMathdoc } from "./createMathdoc";
export { withPlugins } from "./withPlugins";
export { createRef } from "./ref";
export { createRefContainer } from "./createRefContainer";
export { createTheorem } from "./createTheorem";
export { createProof } from "./createProof";
export { createQuestion, createAnswer } from "./exercise";

// for plugin development
export { mergeThemes, mergeClassNames, withCounter } from "./util";
export { RefProvider } from "./ref";
export type { InternalRefMeta } from "./ref";
export type { Creater, Theme } from "./types";
