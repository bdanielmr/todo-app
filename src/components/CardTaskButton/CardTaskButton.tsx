/* eslint-disable */
import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { Task } from '../../utils/types';

type TaskButtonProps = {
  onCreateCard: () => void;
  buttonProps?: ButtonProps;
};

export function CardTaskButton({ onCreateCard, buttonProps }: TaskButtonProps) {
  const handleClick = () => {
    onCreateCard();
  };

  return (
    <Button
      sx={{ width: 200, margin: 2 }}
      variant="contained"
      color="primary"
      onClick={handleClick}
      {...buttonProps}
    >
      Create Task
    </Button>
  );
}
