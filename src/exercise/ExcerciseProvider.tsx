import React, { FC, useMemo } from "react";
import { ExerciseContext } from "./ExerciseContext";

interface Props {
  counter: number;
}

export const ExerciseProvider: FC<Props> = ({ counter, children }) => {
  const value = useMemo(() => ({ counter }), [counter]);

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
};
