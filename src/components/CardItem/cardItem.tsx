/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React, { FC, useState, useEffect, useRef } from 'react';
import { Task } from '../../utils/types';

interface CardProps {
  id: number;
  title?: string;
  description: string;
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (newDescription: string) => void;
  initialTime: number;
  currentTime: number;
  finishTime: number;
  onFinishTime: (time: number) => void;
  onTimerUpdate: (time: number) => void;
}

const getInitialSelectedOption = (initialTime: number) => {
  if (initialTime <= 1800) return 'Corto (30min)';
  if (initialTime <= 2700) return 'Medio (45min)';
  if (initialTime <= 3600) return 'Largo (45min)';
  return 'Largo';
};

const CardItem: FC<CardProps> = ({
  id,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  initialTime,
  currentTime,
  finishTime,
  onFinishTime,
  onTimerUpdate,
}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [timer, setTimer] = useState(finishTime || currentTime || initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [completedTime, setCompletedTime] = useState(finishTime);
  const [selectedOption, setSelectedOption] = useState(
    getInitialSelectedOption(initialTime),
  );
  const [menuLocked, setMenuLocked] = useState(initialTime !== 0);
  const [selectedInitialTime, setSelectedInitialTime] = useState(initialTime);
  const [hasSelectedOption, setHasSelectedOption] = useState(initialTime !== 0);

  const intervalId = useRef<NodeJS.Timeout>();
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isFinished = finishTime !== 0 || isTaskCompleted;

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    localStorage.setItem(`selectedOption-${id}`, e.target.value);
    const newInitialTime = parseInt(e.target.value, 10) * 60;
    setTimer(newInitialTime);
    setSelectedInitialTime(newInitialTime);
    setIsTimerRunning(false);
    setMenuLocked(true);
    setHasSelectedOption(true);
  };

  useEffect(() => {
    const storedTimer = localStorage.getItem(`timer-${id}`);
    if (storedTimer) {
      setTimer(parseInt(storedTimer, 10));
    } else {
      setTimer(initialTime);
    }
  }, [id, initialTime]);

  useEffect(() => {
    localStorage.setItem(`timer-${id}`, timer.toString());
    onTimerUpdate(timer);
    setCompletedTime(timer);
  }, [id, timer]);

  useEffect(() => {
    if (isFinished) {
      clearInterval(intervalId.current!);
      setTimer(completedTime || finishTime);
    } else if (isTimerRunning && timer > 0) {
      intervalId.current = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(intervalId.current!);
    }

    return () => {
      clearInterval(intervalId.current!);
    };
  }, [
    isTimerRunning,
    timer,
    initialTime,
    onFinishTime,
    isFinished,
    completedTime,
  ]);
  useEffect(() => {
    const storedTitle = localStorage.getItem(`title-${id}`);
    const storedDescription = localStorage.getItem(`description-${id}`);
    const storedSelectedOption = localStorage.getItem(`selectedOption-${id}`);

    if (storedTitle) {
      setCurrentTitle(storedTitle);
    }
    if (storedDescription) {
      setCurrentDescription(storedDescription);
    }
    if (storedSelectedOption) {
      setSelectedOption(storedSelectedOption);
      setHasSelectedOption(true);
    }
  }, [id]);
  return (
    <div>
      {isTitleEditing ? (
        <input
          type="text"
          value={currentTitle}
          disabled={isFinished}
          onChange={e => setCurrentTitle(e.target.value)}
          onBlur={() => {
            onTitleChange(currentTitle ?? '');
            setIsTitleEditing(false);
            localStorage.setItem(`title-${id}`, currentTitle ?? '');
          }}
        />
      ) : (
        <h3 onClick={() => !isFinished && setIsTitleEditing(true)}>
          {currentTitle}
        </h3>
      )}
      {isDescriptionEditing ? (
        <textarea
          value={currentDescription}
          disabled={isFinished}
          onChange={e => setCurrentDescription(e.target.value)}
          onBlur={() => {
            onDescriptionChange(currentDescription);
            setIsDescriptionEditing(false);
            localStorage.setItem(`description-${id}`, currentDescription);
          }}
        />
      ) : (
        <p onClick={() => !isFinished && setIsDescriptionEditing(true)}>
          {currentDescription}
        </p>
      )}
      {isFinished ? (
        <div className="completed-tag">Completado</div>
      ) : (
        <select
          disabled={isFinished || menuLocked}
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="30">Corto (30 min)</option>
          <option value="45">Medio (45 min)</option>
          <option value="60">Largo (60 min)</option>
        </select>
      )}
      <div>
        {isTimerRunning ? (
          <button
            disabled={isFinished}
            onClick={() => setIsTimerRunning(!isTimerRunning)}
          >
            Pausar
          </button>
        ) : (
          !isFinished &&
          (hasSelectedOption || timer !== 0) && ( // Muestra el botón de inicio si se ha seleccionado una opción o si el tiempo es diferente de 00:00:00
            <button
              disabled={isFinished}
              onClick={() => setIsTimerRunning(!isTimerRunning)}
            >
              Iniciar
            </button>
          )
        )}
        {isTimerRunning &&
          !isFinished &&
          (hasSelectedOption || timer !== 0) && ( // Muestra el botón de completado si se ha seleccionado una opción o si el tiempo es diferente de 00:00:00
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setIsTaskCompleted(true);
                const remainingTime =
                  selectedInitialTime === 0
                    ? timer
                    : selectedInitialTime - timer;
                setCompletedTime(Math.max(0, remainingTime));
                onFinishTime(Math.max(0, remainingTime));
              }}
            >
              Completado
            </button>
          )}
      </div>
      <div>{formatTime(timer)}</div>
    </div>
  );
};

export { CardItem };
