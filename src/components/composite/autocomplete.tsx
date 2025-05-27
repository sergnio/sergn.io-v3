import clsx from "clsx";
import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import "./Autocomplete.css";
import { useOutsideClick } from "~/hooks/utilities/useOutsideClick";
import { camelize } from "~/utils/transformers";
import { Option } from "~/components/atomic/Dropdown";

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "placeholder" | "onChange" | "id" | "name"
  > {
  options: Option[];
  defaultValue?: Option;
  label: string;
  onConfirm?: (selectedValue: Option) => void;
  onChange?: (newValue: string) => void;
  passthroughStyles?: {
    input?: string;
    container?: string;
    item?: string;
    label?: string;
  };
}

const EMPTY = "";

export const Autocomplete = ({
  options,
  onConfirm,
  onChange,
  defaultValue,
  label,
  passthroughStyles,
  ...rest
}: Props) => {
  const camelizedLabel = camelize(label);
  const [value, setValue] = useState<string>(defaultValue?.name ?? EMPTY);
  const [filtered, setFiltered] = useState<Option[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => {
    setIsOpen(false);
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "Tab":
        if (e.shiftKey) {
          e.preventDefault();
          setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
          return;
        }
      // fallthrough for regular tab
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filtered.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          const selected = filtered[activeIndex];
          setValue(selected.name);
          onConfirm?.(selected);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  const handleOptionClick = (option: Option) => {
    setValue(option.name);
    onConfirm?.(option);
    setIsOpen(false);
  };

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (wrapperRef.current && wrapperRef.current.contains(e.relatedTarget)) {
      return;
    }
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (value.length > 0 && filtered.length > 0) {
      setIsOpen(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    setValue(newValue);
    setActiveIndex(-1);

    if (newValue === EMPTY) {
      setFiltered([]);
      setIsOpen(false);
    } else {
      const newFiltered = options.filter((option) =>
        option.name.toLowerCase().includes(newValue.toLowerCase()),
      );
      setFiltered(newFiltered);
      setIsOpen(newFiltered.length > 0);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={clsx("wrapper", passthroughStyles?.container)}
    >
      <input
        {...rest}
        id={camelizedLabel}
        name={camelizedLabel}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls="autocomplete-list"
        role="combobox"
        className={clsx("input", passthroughStyles?.input)}
        type="text"
        placeholder={EMPTY}
      />
      {label && (
        <label
          htmlFor={camelizedLabel}
          className={clsx("label", passthroughStyles?.label)}
        >
          {label}
        </label>
      )}
      {isOpen && (
        <ul
          onBlur={handleBlur}
          id="autocomplete-list"
          role="listbox"
          className="dropdownMenu"
        >
          {filtered.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={index === activeIndex}
              className={clsx("option", { focused: index === activeIndex })}
              onMouseDown={() => handleOptionClick(option)}
              onMouseEnter={() => setActiveIndex(index)}
              tabIndex={0}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
