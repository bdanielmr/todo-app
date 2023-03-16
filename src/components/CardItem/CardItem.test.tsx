/* eslint-disable */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CardItem } from './CardItem';

// Mock localStorage
const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CardItem', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('renders without crashing', () => {
    const noop = () => {};
    render(
      <CardItem
        id={1}
        title="Test Title"
        description="Test Description"
        onTitleChange={noop}
        onDescriptionChange={noop}
        initialTime={0}
        currentTime={0}
        finishTime={0}
        onFinishTime={noop}
        onTimerUpdate={noop}
      />,
    );
  });

  it('updates title and description', () => {
    const onTitleChange = jest.fn();
    const onDescriptionChange = jest.fn();
    const { getByText, getByDisplayValue } = render(
      <CardItem
        id={1}
        title="Test Title"
        description="Test Description"
        onTitleChange={onTitleChange}
        onDescriptionChange={onDescriptionChange}
        initialTime={0}
        currentTime={0}
        finishTime={0}
        onFinishTime={() => {}}
        onTimerUpdate={() => {}}
      />,
    );

    fireEvent.click(getByText('Test Title'));
    fireEvent.change(getByDisplayValue('Test Title'), {
      target: { value: 'New Title' },
    });
    fireEvent.blur(getByDisplayValue('New Title'));

    fireEvent.click(getByText('Test Description'));
    fireEvent.change(getByDisplayValue('Test Description'), {
      target: { value: 'New Description' },
    });
    fireEvent.blur(getByDisplayValue('New Description'));

    expect(onTitleChange).toHaveBeenCalledWith('New Title');
    expect(onDescriptionChange).toHaveBeenCalledWith('New Description');
  });
});
