import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

test('renders the header when not logged in', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('Lemon Drop - The Vehicle Repo');
  const statusElement = screen.getByText('You are not logged in');
  expect(titleElement).toBeInTheDocument();
  expect(statusElement).toBeInTheDocument();
});

test('renders the filters section', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const chooseElement = screen.getByText('Choose a Vehicle');
  const instructionsElement = screen.getByText('Select a vehicle to start filtering!');
  expect(chooseElement).toBeInTheDocument();
  expect(instructionsElement).toBeInTheDocument();
});

test('renders the hamburger menu when not logged in', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const homeElement = screen.getByText('Home');
  const loginElement = screen.getByText('Login');
  const registerElement = screen.getByText('Register');
  // const test = screen.getByAltText('test')

  // await userEvent.click(screen.getByRole('button'))
  expect(homeElement).toBeInTheDocument();
  expect(loginElement).toBeInTheDocument();
  expect(registerElement).toBeInTheDocument();
});

test('login router routes', async () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('Lemon Drop Login')).toBeInTheDocument();
});

test('register router routes', async () => {
  render(
    <MemoryRouter initialEntries={['/register']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('Lemon Drop User Registration')).toBeInTheDocument();
});
