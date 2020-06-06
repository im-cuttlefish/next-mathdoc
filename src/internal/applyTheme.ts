import { StyleWithTheme, Theme } from "../types";

export const applyTheme = <T extends Theme>(style: StyleWithTheme<T>) => {
  const appliedStyle = { ...style };

  if (style.theme) {
    for (const [key, value] of Object.entries(style.theme)) {
      Reflect.set(appliedStyle, key, { ...value, ...style[key] });
    }
  }

  return appliedStyle;
};
