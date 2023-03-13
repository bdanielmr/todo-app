import { render, fireEvent } from '@testing-library/react';
import { CardMenu } from './CardMenu';

describe('CardMenu', () => {
  it('should render the button', () => {
    const { getByText } = render(<CardMenu onSelect={() => {}} id={1} />);
    expect(getByText('Prioridad')).toBeInTheDocument();
  });

  it('should render the menu items when the button is clicked', () => {
    const { getByText } = render(<CardMenu onSelect={() => {}} id={1} />);
    fireEvent.click(getByText('Prioridad'));
    expect(getByText('corto (30 minutos)')).toBeInTheDocument();
    expect(getByText('medio (45 minutos)')).toBeInTheDocument();
    expect(getByText('largo (60 minutos)')).toBeInTheDocument();
  });

  it('should call onSelect with the selected option when a menu item is clicked', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<CardMenu onSelect={onSelect} id={1} />);
    fireEvent.click(getByText('Prioridad'));
    fireEvent.click(getByText('medio (45 minutos)'));
    expect(onSelect).toHaveBeenCalledWith('medio');
  });

  it('should display the selected value', () => {
    const { getByText } = render(<CardMenu onSelect={() => {}} id={1} />);
    fireEvent.click(getByText('Prioridad'));
    fireEvent.click(getByText('medio (45 minutos)'));
    expect(getByText('prioridad: medio')).toBeInTheDocument();
  });
});
