import { Theme } from "../types";
import { initialTheme } from "./initialTheme";

export const mergeThemes = (theme: Theme | Theme[]) => {
  if (!Array.isArray(theme)) {
    theme = [theme];
  }

  theme = [...theme, initialTheme];

  return theme.reduce((prev, current) => {
    const merged = { ...prev };

    for (const entry of Object.entries(current)) {
      const [key, value] = entry as [keyof Theme, string];
      merged[key] = `${merged[key] || ""} ${value}`.trim();
    }

    return merged;
  });
};
