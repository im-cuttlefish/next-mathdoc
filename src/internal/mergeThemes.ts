import { Theme } from "../types";

export const mergeThemes = (theme: Theme | Theme[]) => {
  if (!Array.isArray(theme)) {
    return theme;
  }

  return theme.reduce((prev, current) => {
    const merged = { ...prev } as { [x in string]?: string };

    for (const [key, value] of Object.entries(current)) {
      merged[key] = `${merged[key] || ""} ${value}`.trim();
    }

    return merged as Theme;
  });
};
