/* eslint-disable */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { StoreContext } from '../../store/StoreProvider';
import { HeaderTasks } from './HeaderTask';
import { HomeType, Task } from '../../utils/types';

describe('HeaderTasks', () => {
  test('renders header title and sidebar items', () => {
    const testDataHome: HomeType = {
      titleHeader: 'Test Header',
      sidebarItems: [
        {
          id: 'Item 1',
          value: 'Item 1',
          label: 'Item 1',
          router: '/item1',
        },
        {
          id: 'Item 1',
          value: 'Item 2',
          label: 'Item 2',
          router: '/item2',
        },
      ],
    };

    const state = {
      dataBoardTask: [] as Task[],
      dataHome: testDataHome,
    };
    const dispatch = () => {};
    const { getByText } = render(
      <MemoryRouter>
        <StoreContext.Provider value={{ state, dispatch }}>
          <HeaderTasks />
        </StoreContext.Provider>
      </MemoryRouter>,
    );

    expect(getByText('Test Header')).toBeInTheDocument();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });
});
