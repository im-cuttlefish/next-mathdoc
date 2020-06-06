import React, { FC, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { applyTheme } from "./internal/applyTheme";
import { RefMeta, TheoremTheme, StyleWithTheme } from "./types";

type Style = StyleWithTheme<TheoremTheme>;

interface Props {
  name?: string;
  register?: (x: RefMeta) => void;
}

export const createTheorem = (prefix: string, style: Style = {}) => {
  const uuidSet = new Set<string>();
  const encoded = encodeURIComponent(prefix);
  const applied = applyTheme(style);

  const Theorem: FC<Props> = ({ name = "", register, children }) => {
    const uuid = useRef(uuidv4()).current;
    const [htmlId, setHtmlId] = useState("");
    const [counter, setCounter] = useState(0);

    if (!uuidSet.has(uuid)) {
      uuidSet.add(uuid);

      const counter = uuidSet.size;
      const htmlId = `theorem-${encoded}-${counter}`;

      if (register) {
        register({ isExternal: false, htmlId, counter, name });
      }

      setCounter(counter);
      setHtmlId(htmlId);
    }

    return (
      <dl id={htmlId} style={applied.container}>
        <dt style={applied.title}>{`${prefix}${counter}．${name}`}</dt>
        <dd style={applied.content}>{children}</dd>
      </dl>
    );
  };

  return Theorem;
};
