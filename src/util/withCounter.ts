import {
  FC,
  createElement,
  useEffect,
  useRef,
  useState,
  ComponentProps,
} from "react";

export const withCounter = <T extends FC<{ counter: number }>>(
  id: string,
  component: T
): FC<Omit<ComponentProps<T>, "counter">> => {
  return (props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      const doc = document.querySelectorAll(`div[data-mathdoc-count="${id}"]`);
      const current = 1 + [...doc].findIndex((elm) => elm === ref.current);

      if (counter !== current) {
        setCounter(current);
      }
    });

    return createElement(
      "div",
      { "data-mathdoc-count": id, style: { display: "contents" }, ref },
      createElement(component, { ...props, counter }, props.children)
    );
  };
};
