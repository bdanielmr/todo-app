/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, Button, CardActions, Grid } from '@mui/material';
import { CardCronometro } from '../CardCronometro';
import { CardMenu } from '../CardMenu';

type CardItemProps = {
  title: string;
  description: string;
  priority: '' | 'bajo' | 'medio' | 'largo';
  id: number;
  completed: boolean;
  completedAt: number;
  onRemove: (id: number) => void;
};

export function CardItem({
  title,
  description,
  priority,
  id,
  completed,
  completedAt,
  onRemove,
}: CardItemProps) {
  // useRef to store a reference to the input fields
  const inputRefs = useRef<{
    title: HTMLInputElement | null;
    description: HTMLTextAreaElement | null;
  }>({ title: null, description: null });

  // useState to maintain the state of the component
  const [titleCard, setTitleCard] = useState({
    title,
    disableTitle: true,
    description,
    disableDescription: true,
  });
  const [cronometroType, setCronometroType] = useState<
    '' | 'bajo' | 'medio' | 'largo'
  >(
    (localStorage.getItem(`${id}-selectedValue`) ??
      '') as CardItemProps['priority'],
  );
  const handleCronometroTypeChange = (
    type: '' | 'bajo' | 'medio' | 'largo',
  ) => {
    setCronometroType(type);
    console.log('ver type', type);
  };
  console.log('VERLO  cronometroType', cronometroType);
  const [completedTime, setCompletedTime] = useState<number | null>(null);

  const handleRemoveClick = () => {
    onRemove(id); // se llama a la función onRemove con el id del elemento
  };

  // function to update the state of the component
  const handleCardItemChange = (
    field: keyof typeof titleCard,
    value: boolean | string,
  ) => {
    setTitleCard({ ...titleCard, [field]: value });
  };

  //  event handler functions for the input fields
  const handleOnChangeTitle = (event: React.FormEvent<HTMLInputElement>) => {
    setTitleCard({ ...titleCard, title: event.currentTarget.value });
  };

  const handleOnChangeDescription = (
    event: React.FormEvent<HTMLTextAreaElement>,
  ) => {
    setTitleCard({ ...titleCard, description: event.currentTarget.value });
  };
  let duration = 0;
  if (priority === '') {
    duration = completedAt;
  }
  if (priority === 'bajo') {
    duration = 1800;
  } else if (priority === 'medio') {
    duration = 2700;
  } else if (priority === 'largo') {
    duration = 3600;
  }

  // useEffect to focus the input fields when they are enabled
  useEffect(() => {
    const refs = [inputRefs.current.title, inputRefs.current.description];
    const disabled = [titleCard.disableTitle, titleCard.disableDescription];
    refs.forEach((ref, i) => {
      if (ref !== null && !disabled[i]) {
        ref.focus();
      }
    });
  }, [titleCard.disableTitle, titleCard.disableDescription]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Button variant="text" color="error" onClick={handleRemoveClick}>
        Eliminar
      </Button>
      {/* use a button to make the input field selectable */}
      <Button
        onClick={() => handleCardItemChange('disableTitle', false)}
        variant="text"
        color="primary"
      >
        <input
          // store the reference to the input field in inputRefs
          ref={el => (inputRefs.current.title = el)}
          // handleCardItemChange to update the state
          // when the input field is blurred
          onBlur={() => handleCardItemChange('disableTitle', true)}
          value={titleCard.title}
          disabled={titleCard.disableTitle}
          onChange={handleOnChangeTitle}
          placeholder="Add a title"
        />
      </Button>

      <CardContent>
        {/* same for the description field */}
        <Button
          onClick={() => handleCardItemChange('disableDescription', false)}
          variant="text"
          color="primary"
        >
          <textarea
            ref={el => (inputRefs.current.description = el)}
            onBlur={() => handleCardItemChange('disableDescription', true)}
            value={titleCard.description}
            disabled={titleCard.disableDescription}
            onChange={handleOnChangeDescription}
            placeholder="Add a description"
          />
        </Button>
      </CardContent>
      <CardActions>
        <Grid container spacing={0} columns={16}>
          <Grid
            item
            xs={16}
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CardMenu id={id} onSelect={handleCronometroTypeChange} />
            {cronometroType === '' ? (
              completed && (
                <CardCronometro
                  completedTask={completed}
                  completedAtTask={completedAt}
                  key={id}
                  id={id}
                  type={cronometroType}
                />
              )
            ) : (
              <CardCronometro
                completedTask={completed}
                completedAtTask={completedAt}
                key={id}
                id={id}
                type={cronometroType}
              />
            )}
          </Grid>
          <Grid
            item
            xs={10}
            display="flex"
            justifyContent="center"
            alignItems="center"
          />
        </Grid>
      </CardActions>
    </Card>
  );
}
