import { render, screen } from '@testing-library/react';
import Register from './Register';
import App from '../App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import { setupWorker, rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.post('http://localhost:3001/register', (request, response, context) => {
    return response(context.json({ success: true }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('renders register card', async () => {
  render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Lemon Drop User Registration')).toBeInTheDocument();

});

test('clicking register with empty fields gives a warning toast', async () => {
  render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    let registerButton = await screen.findAllByRole('button')
    // console.log('register button: ', registerButton)
    userEvent.click(registerButton[1])
    let toasts = await screen.findAllByText('Please fill in all fields')
    expect(toasts.length).toBeGreaterThan(0);
});

test('clicking register with partially empty fields gives a warning toast', async () => {
  render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    let username = screen.getByPlaceholderText('Username')
    let password = screen.getByPlaceholderText('Password')
    let passwordConfirm = screen.getByPlaceholderText('Confirm Password')
    // let firstName = screen.getByPlaceholderText('First Name')
    let lastName = screen.getByPlaceholderText('Last Name')
    await userEvent.type(username, 'testUser')
    await userEvent.type(password, 'testPassword')
    await userEvent.type(passwordConfirm, 'testPassword')
    // await userEvent.type(firstName, 'Fred')
    await userEvent.type(lastName, 'Durst')
    let registerButton = await screen.findAllByRole('button')
    // console.log('register button: ', registerButton)
    userEvent.click(registerButton[1])
    let toasts = await screen.findAllByText('Please fill in all fields')
    expect(toasts.length).toBeGreaterThan(0);
});

test('clicking register with unmatched passwords gives a warning toast', async () => {
  render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    let username = screen.getByPlaceholderText('Username')
    let password = screen.getByPlaceholderText('Password')
    let passwordConfirm = screen.getByPlaceholderText('Confirm Password')
    let firstName = screen.getByPlaceholderText('First Name')
    let lastName = screen.getByPlaceholderText('Last Name')
    await userEvent.type(username, 'SecondTestUser')
    await userEvent.type(password, 'unmatchedpassword')
    await userEvent.type(passwordConfirm, 'testPassword')
    await userEvent.type(firstName, 'Fred')
    await userEvent.type(lastName, 'Durst')
    let registerButton = await screen.findAllByRole('button')
    // console.log('register button: ', registerButton)
    userEvent.click(registerButton[1])
    let toasts = await screen.findAllByText('Passwords do not match')
    expect(toasts.length).toBeGreaterThan(0);
});

test('clicking register with all the correct information gives a successful toast', async () => {
  render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    let username = screen.getByPlaceholderText('Username')
    let password = screen.getByPlaceholderText('Password')
    let passwordConfirm = screen.getByPlaceholderText('Confirm Password')
    let firstName = screen.getByPlaceholderText('First Name')
    let lastName = screen.getByPlaceholderText('Last Name')
    await userEvent.type(username, 'ThirdTestUser')
    await userEvent.type(password, 'testPassword')
    await userEvent.type(passwordConfirm, 'testPassword')
    await userEvent.type(firstName, 'Fred')
    await userEvent.type(lastName, 'Durst')
    let registerButton = await screen.findAllByRole('button')
    // console.log('register button: ', registerButton)
    userEvent.click(registerButton[1])
    let toasts = await screen.findAllByText('Registration Successful!')
    expect(toasts.length).toBeGreaterThan(0);
});