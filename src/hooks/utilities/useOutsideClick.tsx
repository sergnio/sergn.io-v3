import { RefObject, useEffect } from "react";
import { Nullable } from "~/types/utils";

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<Nullable<T>>,
  onClickOutside: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const el = ref.current;
      if (el && !el.contains(event.target as Node)) {
        onClickOutside(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}
