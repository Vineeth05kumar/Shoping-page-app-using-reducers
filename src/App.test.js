import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  it('renders the app component', () => {
    const { getByText } = render(<App />);
    expect(getByText('Expense Tracker')).toBeInTheDocument();
  });

  it('renders the cart button', () => {
    const { getByText } = render(<App />);
    expect(getByText('My Cart')).toBeInTheDocument();
  });

  it('renders the products list', () => {
    const { getByText } = render(<App />);
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
  });

  it('calls the toggleCartHandler function when the cart button is clicked', () => {
    const toggleCartHandler = jest.fn();
    const { getByText } = render(<App toggleCartHandler={toggleCartHandler} />);
    const cartButton = getByText('My Cart');
    fireEvent.click(cartButton);
    expect(toggleCartHandler).toHaveBeenCalledTimes(1);
  });

  it('renders the notification component when the cart is empty', () => {
    const { getByText } = render(<App />);
    expect(getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders the cart component when the cart is not empty', () => {
    const { getByText } = render(<App />);
    // Add an item to the cart
    const addItemButton = getByText('Add to Cart');
    fireEvent.click(addItemButton);
    expect(getByText('Cart')).toBeInTheDocument();
  });

  it('calls the fetchCartData function when the app mounts', () => {
    const fetchCartData = jest.fn();
    render(<App fetchCartData={fetchCartData} />);
    expect(fetchCartData).toHaveBeenCalledTimes(1);
  });

  it('renders the loading indicator when the cart data is being fetched', () => {
    const { getByText } = render(<App />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the error message when the cart data fetch fails', () => {
    const { getByText } = render(<App />);
    // Simulate a fetch error
    const error = new Error('Fetch failed');
    jest.spyOn(window, 'fetch').mockImplementation(() => Promise.reject(error));
    expect(getByText('Error: Fetch failed')).toBeInTheDocument();
  });

  it('renders the success message when the cart data fetch succeeds', () => {
    const { getByText } = render(<App />);
    // Simulate a successful fetch
    const data = { items: [], totalQuantity: 0 };
    jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve(data));
    expect(getByText('Cart data fetched successfully')).toBeInTheDocument();
  });
});