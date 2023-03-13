import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BoardTask } from './BoardTask';

type typeCronometro = '' | 'bajo' | 'medio' | 'largo';

describe('BoardTask', () => {
  it('adds a new item when the "Agregar Nuevo Item" button is clicked', () => {
    const items = [
      {
        id: 1,
        label: 'Item 1',
        idTimer: '',
        completed: false,
        completedAt: 0,
        priority: '' as typeCronometro,
      },
      {
        id: 2,
        label: 'Item 2',
        idTimer: '',
        completed: false,
        completedAt: 0,
        priority: '' as typeCronometro,
      },
    ];
    const { getByTestId, getByDisplayValue } = render(
      <BoardTask items={items} />,
    );
    const addButton = getByTestId('add-new-item-button');
    fireEvent.click(addButton);
    const newItem = getByDisplayValue('New Item 3');
    expect(newItem).toBeInTheDocument();
  });
});
