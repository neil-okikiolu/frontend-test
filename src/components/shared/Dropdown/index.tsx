import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { FiChevronDown, FiCheck } from "react-icons/fi";

interface DropdownProps {
  placeholder: string;
  selectedOption: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  selectedOption,
  options,
  onSelect: setSelectedOption
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!container?.current?.contains(event.target as Node)) {
        if (!isOpen) return;
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen, container]);

  const onOptionClicked = (option: string) => () => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div ref={container} className="dropdown__container">
      <div className="dropdown__header" onClick={toggle}>
        {selectedOption || placeholder}{" "}
        <FiChevronDown
          className={`dropdown__header__arrow ${
            isOpen ? "dropdown__header__arrow--open" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="dropdown__list_container">
          <ul className="dropdown__list">
            {options.map((option) => (
              <li
                key={option.value}
                className="dropdown__list-item"
                onClick={onOptionClicked(option.value)}
              >
                {option.value === selectedOption ? (
                  <span className="dropdown__list-item__radio dropdown__list-item__radio--selected">
                    <FiCheck />
                  </span>
                ) : (
                  <span className="dropdown__list-item__radio" />
                )}{" "}
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
