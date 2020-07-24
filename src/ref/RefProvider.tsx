import React, { FC, useMemo } from "react";
import { InternalRefMeta } from "./types";
import { RefContext } from "./RefContext";

interface Props {
  refMeta: InternalRefMeta;
}

export const RefProvider: FC<Props> = ({ refMeta, children }) => {
  const memoized: InternalRefMeta = useMemo(
    () => ({ ...refMeta, isExternal: false }),
    [refMeta.counter, refMeta.name, refMeta.htmlId]
  );

  return <RefContext.Provider value={memoized}>{children}</RefContext.Provider>;
};
