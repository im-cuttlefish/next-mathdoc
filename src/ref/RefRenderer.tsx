import React, { FC, useMemo } from "react";
import Link from "next/link";
import { Theme } from "../types";
import { RefMeta, InternalRefMeta } from "./types";
import { mergeThemes, mergeClassNames } from "../util";

interface Props {
  id: string;
  prefix: string;
  refMeta: RefMeta;
  name?: boolean;
  theme?: Theme | Theme[];
  className?: string;
}

const classNames = {
  refLink: "mathdoc-ref-link",
  refInternalLink: "mathdoc-ref-internal-link",
  refExternalLink: "mathdoc-ref-external-link",
};

export const RefRenderer: FC<Props> = ({
  id,
  prefix,
  refMeta,
  name,
  theme = {},
  className,
}) => {
  const { refLink, refInternalLink, refExternalLink } = useMemo(
    () => mergeThemes(classNames, theme),
    [theme]
  );

  if (refMeta.isExternal) {
    const external = mergeClassNames(refLink, refExternalLink, className);
    const { path, name } = refMeta;
    const isFullPath = /^(https?:)?\/\//.test(path);

    if (isFullPath) {
      return (
        <a href={path} className={external} data-mathdoc-id={id}>
          {name}
        </a>
      );
    }

    return (
      <Link href={path}>
        <a className={external} data-mathdoc-id={id}>
          {name}
        </a>
      </Link>
    );
  }

  const internal = mergeClassNames(refLink, refInternalLink, className);
  const { counter, htmlId } = refMeta as InternalRefMeta;

  if (name && refMeta.name) {
    return (
      <Link href={`#${htmlId}`}>
        <a className={internal} data-mathdoc-id={id}>{`${refMeta.name}`}</a>
      </Link>
    );
  }

  return (
    <Link href={`#${htmlId}`}>
      <a className={internal} data-mathdoc-id={id}>{`${prefix}${counter}`}</a>
    </Link>
  );
};
