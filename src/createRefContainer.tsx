import React, { FC } from "react";
import { createCounter, RefProvider } from "./util";
import { InternalRefMeta, Creater } from "./types";

export interface RefContainerArguments {
  id: string;
}

interface Props {
  name?: string;
}

export const createRefContainer: Creater<RefContainerArguments> = ({ id }) => {
  const encoded = encodeURIComponent(id);
  const useCounter = createCounter();

  const Container: FC<Props> = ({ name, children }) => {
    const counter = useCounter();
    const htmlId = `${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };
    name && (refMeta.name = name);

    return (
      <div id={htmlId} style={{ display: "contents" }} data-mathdoc-id={id}>
        <RefProvider refMeta={refMeta}>{children}</RefProvider>
      </div>
    );
  };

  return { Component: Container };
};
