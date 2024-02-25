import { render, screen } from 'test/utilities';
import PackingList from '.';
import { expect } from 'vitest';
import { createStore } from '@/examples/packing-list/store';
import { Provider } from 'react-redux';

createStore();

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  const inputField = screen.getByPlaceholderText(/new item/i);
  expect(inputField).toBeInTheDocument();
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const addNewItemBtn = screen.getByLabelText(/add new item/i);
  expect(addNewItemBtn).toBeInTheDocument();
  expect(addNewItemBtn).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const inputField = screen.getByPlaceholderText(/new item/i);

  await user.type(inputField, 'Laptop');

  const addNewItemBtn = screen.getByLabelText(/add new item/i);
  expect(addNewItemBtn).toBeInTheDocument();
  expect(addNewItemBtn).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const inputField = screen.getByPlaceholderText(/new item/i);

  await user.type(inputField, 'Shoes');
  const addNewItemBtn = screen.getByLabelText(/add new item/i);
  await user.click(addNewItemBtn);
  const unpackedList = screen.getByTestId(/unpacked-items-list/i);
  expect(unpackedList.children).toHaveLength(1);
});
