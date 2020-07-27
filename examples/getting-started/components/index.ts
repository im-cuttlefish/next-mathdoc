import { createMathdoc } from "next-mathdoc";

export const [M, Provider] = createMathdoc({
  Theorem: [
    "$theorem",
    {
      id: "theorem",
      prefix: "Theorem.",
    },
  ],
  TRef: [
    "$ref",
    {
      id: "ref",
      prefix: "Theorem.",
    },
  ],
});
