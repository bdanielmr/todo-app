/* eslint-disable */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ColumnTask } from './ColumTask';

describe('ColumnTask', () => {
  test('renders column title', () => {
    const { getByText } = render(
      <ColumnTask title="Test Column" onDrop={() => {}} onDragOver={() => {}}>
        <div>Test content</div>
      </ColumnTask>,
    );

    expect(getByText('Test Column')).toBeInTheDocument();
  });

  test('renders children content', () => {
    const { getByText } = render(
      <ColumnTask title="Test Column" onDrop={() => {}} onDragOver={() => {}}>
        <div>Test content</div>
      </ColumnTask>,
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  test('calls onDrop and onDragOver when events occur', () => {
    const handleDrop = jest.fn();
    const handleDragOver = jest.fn();

    const { getByText } = render(
      <ColumnTask
        title="Test Column"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div>Test content</div>
      </ColumnTask>,
    );

    fireEvent.drop(getByText('Test content'));
    fireEvent.dragOver(getByText('Test content'));

    expect(handleDrop).toHaveBeenCalledTimes(1);
    expect(handleDragOver).toHaveBeenCalledTimes(1);
  });
});
