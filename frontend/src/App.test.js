import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event' 

beforeAll(() => {
  // render(
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // );
})

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

  await userEvent.click(screen.getByRole('button'))
  expect(homeElement).toBeInTheDocument();
  expect(loginElement).toBeInTheDocument();
  expect(registerElement).toBeInTheDocument();
});
