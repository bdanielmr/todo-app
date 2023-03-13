import { render, fireEvent } from '@testing-library/react';
import { CardCronometro } from './CardCronometro';

type typeCronometro = '' | 'bajo' | 'medio' | 'largo';
describe('CardCronometro', () => {
  test('renders the component with initial values', () => {
    const props = {
      id: 1,
      type: 'medio' as typeCronometro,
      time: 0,
      completedTask: false,
      completedAtTask: 0,
    };

    const { getByText } = render(<CardCronometro {...props} />);

    expect(getByText('Tiempo restante:')).toBeInTheDocument();
    expect(getByText('Iniciar')).toBeInTheDocument();
  });

  test('starts and pauses the countdown', () => {
    const props = {
      id: 1,
      type: 'medio' as typeCronometro,
      time: 0,
      completedTask: false,
      completedAtTask: 0,
    };

    const { getByText } = render(<CardCronometro {...props} />);

    fireEvent.click(getByText('Iniciar'));
    expect(getByText(/Pausar/i)).toBeInTheDocument();

    fireEvent.click(getByText(/Pausar/i));
    expect(getByText(/Reanudar/i)).toBeInTheDocument();
  });

  test('completes the task and shows total time', () => {
    const props = {
      id: 1,
      type: 'medio' as typeCronometro,
      time: 0,
      completedTask: false,
      completedAtTask: 0,
    };

    const { getByText } = render(<CardCronometro {...props} />);

    fireEvent.click(getByText('Iniciar'));
    expect(getByText(/Completar/i)).toBeInTheDocument();

    fireEvent.click(getByText(/Completar/i));
    expect(getByText(/Tiempo total:/i)).toBeInTheDocument();
  });
});
