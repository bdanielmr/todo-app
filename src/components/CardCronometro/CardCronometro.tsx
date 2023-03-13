/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

type Props = {
  id: number;
  type: '' | 'bajo' | 'medio' | 'largo';
  time?: number;
  completedTask: boolean;
  completedAtTask?: number;
};

export function CardCronometro({
  id,
  type,
  time = 0,
  completedTask = false,
  completedAtTask = 0,
}: Props) {
  const maximoTiempo = {
    '': completedAtTask,
    bajo: 30 * 60,
    medio: 45 * 60,
    largo: 60 * 60,
  };

  const tiempoInicial = maximoTiempo[type] || 60 * 60;

  const [horas, setHoras] = useState<number>(0);
  const [minutos, setMinutos] = useState<number>(0);
  const [segundos, setSegundos] = useState<number>(0);
  const [iniciado, setIniciado] = useState<boolean>(false);
  const [tiempoRestante, setTiempoRestante] = useState<number>(() => {
    const tiempoGuardado = localStorage.getItem(`tiempoRestante_${id}`);
    return tiempoGuardado !== null
      ? parseInt(tiempoGuardado)
      : completedTask && completedAtTask
      ? completedAtTask
      : time > 0
      ? time
      : tiempoInicial;
  });

  const [running, setRunning] = useState<boolean>(false);
  const [tareaCompletada, setTareaCompletada] = useState<boolean>(false);
  const [tiempoTotal, setTiempoTotal] = useState<number>(0);
  const [completado, setCompletado] = useState<boolean>(() => {
    const completadoGuardado = localStorage.getItem(`completado_${id}`);
    return completadoGuardado ? JSON.parse(completadoGuardado) : false;
  });
  const [localStorageLoaded, setLocalStorageLoaded] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(`completado_${id}`, JSON.stringify(completado));
  }, [completado, id]);

  useEffect(() => {
    localStorage.setItem(`tiempoRestante_${id}`, tiempoRestante.toString());
  }, [tiempoRestante, id]);

  useEffect(() => {
    setHoras(Math.floor(tiempoRestante / 3600));
    setMinutos(Math.floor((tiempoRestante / 60) % 60));
    setSegundos(tiempoRestante % 60);
  }, [tiempoRestante]);

  const dosDigitos = (valor: number): string =>
    valor < 10
      ? `0${Math.floor(valor).toString()}`
      : Math.floor(valor).toString();

  const iniciarCronometro = () => {
    if (tiempoRestante <= 0 && !iniciado) {
      setTiempoRestante(tiempoInicial);
      setRunning(true);
      setIniciado(true);
    } else if (!iniciado) {
      setRunning(true);
      setIniciado(true);
    } else {
      setRunning(true);
    }
  };

  const pausarCronometro = () => {
    setRunning(false);
    setIniciado(true);
  };

  const detenerCronometro = () => {
    setTiempoRestante(tiempoInicial);
    setRunning(false);
    setIniciado(false);
  };

  const completarCronometro = () => {
    setRunning(false);
    setIniciado(false);
    setTareaCompletada(true);
    const tiempoTotal =
      completedTask && completedAtTask
        ? completedAtTask
        : tiempoInicial - tiempoRestante;
    setTiempoTotal(tiempoTotal);
    localStorage.setItem(`tiempoTotal_${id}`, tiempoTotal.toString());
    setCompletado(true);
    setTiempoRestante(tiempoTotal);
  };

  useEffect(() => {
    let intervalo: NodeJS.Timer | null = null;
    if (running && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante(tiempoRestante => tiempoRestante - 1);
      }, 1000);
    } else {
      clearInterval(intervalo as unknown as NodeJS.Timer);
    }

    return () => clearInterval(intervalo as NodeJS.Timer);
  }, [running, tiempoRestante]);

  useEffect(() => {
    const tiempoRestante = parseInt(
      localStorage.getItem(`tiempoRestante_${id}`) || '0',
    );
    if (tiempoRestante <= 0) {
      setTareaCompletada(true);
      setCompletado(true);
    } else {
      setTareaCompletada(false);
    }
    setLocalStorageLoaded(true);
  }, [id]);

  useEffect(() => {
    const tiempoTotalGuardado = localStorage.getItem(`tiempoTotal_${id}`);
    setTiempoTotal(tiempoTotalGuardado ? parseInt(tiempoTotalGuardado) : 0);
  }, [id]);

  useEffect(() => {
    const tiempoRes = parseInt(
      localStorage.getItem(`tiempoRestante_${id}`) || '0',
    );
    const maximoTiempo = {
      '': completedAtTask,
      bajo: 30 * 60,
      medio: 45 * 60,
      largo: 60 * 60,
    };
    const tiempoInicial = maximoTiempo[type] || 60 * 60;
    console.log('NO S E QUE  HACER ', tiempoInicial);
    setTiempoRestante(tiempoRes);
  }, [type]);
  return (
    <Box>
      {!localStorageLoaded ? (
        <p>Cargando...</p>
      ) : (
        <Box>
          {!completado && (
            <p>{completedTask ? 'Tiempo total:' : 'Tiempo restante:'}</p>
          )}
          {completado && (
            <p>
              Tiempo total: {dosDigitos(Math.floor(tiempoTotal / 3600))}:
              {dosDigitos(Math.floor((tiempoTotal / 60) % 60))}:
              {dosDigitos(tiempoTotal % 60)}
            </p>
          )}
          {!completado &&
            (tareaCompletada ? (
              <p>
                Tiempo total: {dosDigitos(Math.floor(tiempoTotal / 3600))}:
                {dosDigitos(Math.floor((tiempoTotal / 60) % 60))}:
                {dosDigitos(tiempoTotal % 60)}
              </p>
            ) : (
              <p>
                {dosDigitos(Math.floor(tiempoRestante / 3600))}:
                {dosDigitos(Math.floor((tiempoRestante / 60) % 60))}:
                {dosDigitos(tiempoRestante % 60)}
              </p>
            ))}
          {!tareaCompletada && running ? (
            <>
              <button onClick={pausarCronometro}>Pausar</button>
              <button onClick={detenerCronometro}>Detener</button>
              {!completedTask && (
                <button onClick={completarCronometro}>Completar</button>
              )}
            </>
          ) : iniciado ? (
            <button onClick={iniciarCronometro}>Reanudar</button>
          ) : (
            !completado &&
            !completedTask && (
              <button onClick={iniciarCronometro}>Iniciar</button>
            )
          )}
        </Box>
      )}
    </Box>
  );
}
