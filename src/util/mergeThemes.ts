import { Theme } from "../types";

export const mergeThemes = <T extends Theme>(
  classNames: T,
  ...theme: (Theme | Theme[])[]
) => {
  const flatten = [classNames, theme].flat(Infinity) as Theme[];

  return flatten.reduce((prev, current) => {
    const merged = { ...prev };

    for (const entry of Object.entries(current)) {
      const [key, value] = entry as [keyof Theme, string];
      merged[key] = `${merged[key] || ""} ${value}`.trim();
    }

    return merged;
  }) as T;
};
