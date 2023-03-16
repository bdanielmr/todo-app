/* eslint-disable */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardTaskButton } from './CardTaskButton';

describe('CardTaskButton', () => {
  test('renders the button with "Create Task" text', () => {
    const { getByText } = render(<CardTaskButton onCreateCard={() => {}} />);
    expect(getByText('Create Task')).toBeInTheDocument();
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();

    const { getByText } = render(<CardTaskButton onCreateCard={handleClick} />);

    fireEvent.click(getByText('Create Task'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
