import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from 'react';

type RadioButtonGroupProps = {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
  return (
    <FormControl>
      <RadioGroup value={selectedValue} onChange={onChange}>
        {options.map(({ value, label }) => (
          <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
