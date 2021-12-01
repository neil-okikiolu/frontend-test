import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { GoPrimitiveDot } from "react-icons/go";

interface RadioPickerProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const RadioPicker: React.FC<RadioPickerProps> = ({
  label,
  selected,
  onClick: setSelected
}) => (
  <div className="radio-picker__container">
    <div className="radio-picker__header" onClick={setSelected}>
      {selected ? (
        <span className="radio-picker__radio radio-picker__radio--selected">
          <GoPrimitiveDot />
        </span>
      ) : (
        <span className="radio-picker__radio" />
      )}
      {label}
    </div>
  </div>
);

export default RadioPicker;
