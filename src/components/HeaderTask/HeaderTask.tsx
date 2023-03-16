/* eslint-disable */
import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { StoreContext } from '../../store/StoreProvider';
import { StoreContextType, HomeType, Task } from '../../utils/types';

const HeaderTasks = () => {
  const { state } = useContext<StoreContextType | null>(StoreContext) || {
    state: {
      dataBoardTask: [] as Task[],
      dataHome: [] as unknown as HomeType,
    },
  };
  const { dataHome }: { dataHome: HomeType } = state;

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          {dataHome.titleHeader}
        </Typography>

        {dataHome.sidebarItems.map(value => (
          <a href={value.router ?? ''}>
            <Typography
              key={value.id}
              sx={{ marginLeft: 5 }}
              variant="h6"
              noWrap
            >
              {value.value}
            </Typography>
          </a>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export { HeaderTasks };
