export const mergeClassNames = (...classNames: (string | undefined)[]) =>
  classNames.filter((x) => !!x).join(" ");
