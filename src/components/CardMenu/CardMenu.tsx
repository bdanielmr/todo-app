/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

type OptionMenu = {
  type: '' | 'bajo' | 'medio' | 'largo';
};

type Props = {
  onSelect: (value: OptionMenu['type']) => void;
  id: number;
};

export function CardMenu({ onSelect, id }: Props) {
  const storedValue = (localStorage.getItem(`${id}-selectedValue`) ??
    '') as OptionMenu['type'];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] =
    useState<OptionMenu['type']>(storedValue);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: OptionMenu['type']) => {
    setSelectedValue(value);
    localStorage.setItem(`${id}-selectedValue`, value);
    localStorage.setItem(
      `tiempoRestante_${id}`,
      value === 'bajo' ? '1800' : value === 'medio' ? '2700' : '3600',
    );
    onSelect(value);
    handleClose();
  };

  useEffect(() => {
    localStorage.setItem(`${id}-selectedValue`, selectedValue);
    localStorage.setItem(
      `tiempoRestante_${id}`,
      selectedValue === 'bajo'
        ? '1800'
        : selectedValue === 'medio'
        ? '2700'
        : '3600',
    );
  }, [selectedValue]);

  return (
    <div>
      <Button onClick={handleClick}>Prioridad</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSelect('bajo')}>
          corto (30 minutos)
        </MenuItem>
        <MenuItem onClick={() => handleSelect('medio')}>
          medio (45 minutos)
        </MenuItem>
        <MenuItem onClick={() => handleSelect('largo')}>
          largo (60 minutos)
        </MenuItem>
      </Menu>
      {selectedValue && <p>prioridad: {selectedValue}</p>}
    </div>
  );
}
