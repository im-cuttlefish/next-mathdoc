---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

## TL;DR

See this example, and run `npm run dev`.

## Installation

This library requires Next.js. If you are unfamilier to Next.js, please see [Getting Started of Next.js](https://nextjs.org/docs/getting-started).

If you've already got Next.js and [MDX.js](https://github.com/vercel/next.js/tree/canary/packages/next-mdx) in place, all you need to do is this.

```bash
npm i next-mathdoc
```

Maybe you want to use LaTeX notation, then you need to configurate MDX.js. The way is written in [the repo of remark-math](https://github.com/remarkjs/remark-math).

## Example

```typescript
import { createMathdoc } from "next-mathdoc";

export const [M, Provider] = createMathdoc({
  Theorem: [
    "$theorem",
    {
      id: "theorem",
      prefix: "Theorem",
    },
  ],
  TRef: [
    "$ref",
    {
      id: "ref",
      prefix: "Theorem",
    },
  ]
});

```

```markdown
import { M, Provider } from "../../components/mathdoc";
export default Provider;

## Binomial Theorem

In this page, We will introduce binomial theorem.

<M.Theorem name="Binomial Theorem">

  <M.TRef label="binomial" />

  Suppose $n \in \mathbb{N}$, then

  $$
    (a + b)^n = \sum_{k = 0}^n {}_n C_r a^k b^{n - k}
  $$
</M.Theorem>

<M.TRef use="binomial" /> is useful.

```
