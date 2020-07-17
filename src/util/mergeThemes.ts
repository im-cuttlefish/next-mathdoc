import { Theme } from "../types";

const initialTheme: Theme = {
  // ref
  refLink: "mathdoc-ref-link",
  refInternalLink: "mathdoc-ref-internal-link",
  refExternalLink: "mathdoc-ref-external-link",

  //theorem
  theoremContainer: "mathdoc-theorem-container",
  theoremContent: "mathdoc-theorem-content",
  theoremTitle: "mathdoc-theorem-title",

  // proof
  proofContainer: "mathdoc-proof-container",
  proofContent: "mathdoc-proof-content",
  proofStartMark: "mathdoc-proof-start-mark",
  proofEndMark: "mathdoc-proof-end-mark",

  // question
  questionContainer: "mathdoc-question-container",
  questionContent: "mathdoc-question-content",
  questionTitle: "mathdoc-question-title",

  // answer
  answerContainer: "mathdoc-answer-container",
  answerContent: "mathdoc-answer-content",
  answerTitle: "mathdoc-answer-title",
};

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
