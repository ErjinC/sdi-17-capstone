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
  }),

  rest.get('http://localhost:3001/bases', (request, response, context) => {
    const data = [
      { baseId: 1, name: 'Patrick SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 2, name: 'Buckley SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 3, name: 'Peterson SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 4, name: 'Schriever SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 5, name: 'Los Angeles SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 6, name: 'Vandenberg SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 7, name: 'Beale AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 8, name: 'Travis AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 9, name: 'MacDill AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 10, name: 'Hickam AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 11, name: 'Scott AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 12, name: 'Andrews AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 13, name: 'Nellis AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 14, name: 'Cannon AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 15, name: 'Tinker AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 16, name: 'Shaw AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 17, name: 'Hill AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 18, name: 'Kadena AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 19, name: 'Osan AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
      { baseId: 20, name: 'Aviano AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' }
    ];    
    return response(context.json(data))
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
    userEvent.click(registerButton[0])
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
    userEvent.click(registerButton[0])
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
    userEvent.click(registerButton[0])
    let toasts = await screen.findAllByText('Passwords do not match, please try again.')
    expect(toasts.length).toBeGreaterThan(0);
});

test('clicking register with all the correct information gives a successful toast', async () => {
  render(
      <MemoryRouter initialEntries={['/register']} initialIndex={0}>
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
    // console.log('before path: ', window.location.pathname)
    // console.log('register button: ', registerButton)
    userEvent.click(registerButton[0])
    // console.log('after path: ', window.location.pathname)
    let toasts = await screen.findAllByText('Registration successful')
    expect(toasts.length).toBeGreaterThan(0);
});