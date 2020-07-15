import React, { FC } from "react";
import { RefProvider, withCounter } from "./util";
import { InternalRefMeta, Creater } from "./types";

export interface RefContainerArguments {
  id: string;
}

interface Props {
  name?: string;
  counter: number;
}

const style = { display: "contents" };

export const createRefContainer: Creater<RefContainerArguments> = ({ id }) => {
  const encoded = encodeURIComponent(id);

  const Container: FC<Props> = ({ name, counter, children }) => {
    const htmlId = `${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };
    name && (refMeta.name = name);

    return (
      <div id={htmlId} style={style} data-mathdoc-id={id}>
        <RefProvider refMeta={refMeta}>{children}</RefProvider>
      </div>
    );
  };

  return { Component: withCounter(id, Container) };
};
