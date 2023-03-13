/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, Container } from '@mui/material';
import { CardItem } from '../CardItem/cardItem';

interface Item {
  id: number;
  label: string;
  idTimer: string;
  completed: boolean;
  completedAt: number;
  priority: '' | 'bajo' | 'medio' | 'largo';
}

interface Props {
  items: Item[];
}

const STORAGE_KEY = 'board-task-columns';

export function BoardTask({ items }: Props) {
  const [filterPriority, setFilterPriority] = useState<
    '' | 'bajo' | 'medio' | 'largo'
  >('');
  const [idCounter, setIdCounter] = useState(items.length);
  const [columns, setColumns] = useState<Item[][]>(() => {
    const storedColumns = localStorage.getItem(STORAGE_KEY);
    if (storedColumns) {
      return JSON.parse(storedColumns);
    }
    return [
      items.filter(item => !item.completed),
      [],
      items.filter(item => item.completed),
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    columnIndex: number,
  ) => {
    event.preventDefault();
    const droppedItem = JSON.parse(event.dataTransfer.getData('item'));
    const newColumns = columns.map((column, i) =>
      i === columnIndex
        ? column.some(item => item.id === droppedItem.id)
          ? column.map(item =>
              item.id === droppedItem.id ? { ...item } : item,
            )
          : [...column, droppedItem]
        : column.filter(item => item.id !== droppedItem.id),
    );
    // Comprueba si el elemento que se está moviendo ya está en la columna de "completados"
    if (
      columns[2].find(item => item.id === droppedItem.id) &&
      columnIndex !== 2
    ) {
      return; // Si está en la columna de "completados", no permitir que se mueva a otra columna
    }
    setColumns(newColumns);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    item: Item,
  ) => {
    event.dataTransfer.setData('item', JSON.stringify(item));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const addItem = () => {
    const newId = idCounter + 1;
    setIdCounter(newId);
    const newItem = {
      id: newId,
      label: `New Item ${newId}`,
      idTimer: '',
      completed: false,
      completedAt: 0,
      priority: '' as Item['priority'],
    };
    setColumns([[...columns[0], newItem], ...columns.slice(1)]);
  };
  const handleRemoveItem = (id: number) => {
    const newColumns = columns.map(column =>
      column.filter(item => item.id !== id),
    );
    setColumns(newColumns);
  };
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          flexDirection: { xs: 'column', sm: 'column' },
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: { xs: 2, sm: 0 } }}>
          <Button variant="outlined" onClick={() => setFilterPriority('bajo')}>
            Filtrar por Prioridad Baja
          </Button>
          <Button variant="outlined" onClick={() => setFilterPriority('medio')}>
            Filtrar por Prioridad Media
          </Button>
          <Button variant="outlined" onClick={() => setFilterPriority('largo')}>
            Filtrar por Prioridad Larga
          </Button>
          <Button variant="outlined" onClick={() => setFilterPriority('')}>
            Mostrar Todos
          </Button>
          <Button
            variant="contained"
            onClick={addItem}
            data-testid="add-new-item-button"
          >
            Agregar Nuevo Item
          </Button>
        </Box>
      </Container>
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
        }}
      >
        {columns.map((column, columnIndex) => (
          <Grid
            key={columnIndex}
            item
            xs={12}
            sm={3}
            style={{
              border: '1px solid lightgreen',
              margin: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onDrop={event => handleDrop(event, columnIndex)}
            onDragOver={handleDragOver}
          >
            {columnIndex === 0 && <p>TaskManager</p>}
            {columnIndex === 1 && <p>Progress</p>}
            {columnIndex === 2 && <p>CompleteTask</p>}
            {column
              .filter(
                item =>
                  filterPriority === '' || item.priority === filterPriority,
              )
              .map((item, index) => (
                <Box
                  key={item.id}
                  color="primary"
                  draggable
                  onDragStart={event => handleDragStart(event, item)}
                  onDragOver={handleDragOver}
                  onDrop={event => handleDrop(event, columnIndex)}
                  data-index={index}
                  style={{ margin: '8px' }}
                >
                  <CardItem
                    onRemove={handleRemoveItem}
                    id={item.id}
                    title={item.label}
                    description=""
                    priority={item.priority}
                    completed={item.completed}
                    completedAt={item.completedAt}
                  />
                </Box>
              ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
