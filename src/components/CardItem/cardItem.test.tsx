import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardItem } from './cardItem';

describe('CardItem', () => {
  it('calls the onRemove function when the "Eliminar" button is clicked', () => {
    const handleRemove = jest.fn();
    render(
      <CardItem
        title="Test title"
        description="Test description"
        priority="medio"
        id={1}
        completed={false}
        completedAt={0}
        onRemove={handleRemove}
      />,
    );

    const deleteButton = screen.getByText('Eliminar');
    userEvent.click(deleteButton);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith(1);
  });
});
