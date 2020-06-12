import React, { FC, useState, useEffect } from "react";
import { createCounter, mergeThemes } from "./internal";
import { RefMeta, Theme } from "./types";

interface Arguments {
  theme?: Theme | Theme[];
}

interface Props {
  name?: string;
  register?: (x: RefMeta) => void;
}

export const createTheorem = (
  prefix: string,
  { theme = {} }: Arguments = {}
) => {
  const merged = mergeThemes(theme);
  const encodedPrefix = encodeURIComponent(prefix);
  const useCounter = createCounter();

  const Theorem: FC<Props> = ({ name = "", register, children }) => {
    const [htmlId, setHtmlId] = useState("");
    const counter = useCounter();
    const title = `${prefix}${counter}．${name}`;

    useEffect(() => {
      const htmlId = `theorem-${encodedPrefix}-${counter}`;
      setHtmlId(htmlId);
      register && register({ isExternal: false, htmlId, counter, name });
    }, []);

    return (
      <dl id={htmlId} className={merged.theoremContainer}>
        <dt className={merged.theoremTitle}>{title}</dt>
        <dd className={merged.theoremContent}>{children}</dd>
      </dl>
    );
  };

  return Theorem;
};
