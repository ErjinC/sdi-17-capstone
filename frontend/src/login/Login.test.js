import { render, screen } from '@testing-library/react';
import Login from './Login';
import App from '../App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import { setupWorker, rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.post('http://localhost:3001/login', (request, response, context) => {
    let data = {
      userId: 1,
      admin: true,
      username: "ben10",
      password: "test",
      first_name: "Larry",
      last_name: "Llama",
      base: "Beale AFB",
      favorites: "1,2,3,4,5",
      phone: "000-000-0000",
      email: "username@example.com"
    }
    let successBool;
    if (request.body[0].password === data.password) {
      successBool = true
    } else {
      successBool = false
    }
    return response(context.json({ success: successBool, ...data }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('renders login card', async () => {
    render(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Lemon Drop Login')).toBeInTheDocument();

  });

test('clicking login without a username and password gives a warning toast', async () => {
  render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    let loginButton = await screen.findAllByRole('button')
    userEvent.click(loginButton[1])
    let toasts = await screen.findAllByText('Please fill in both fields')
    expect(toasts.length).toBeGreaterThan(0);
});

test('clicking login with an invalid username and password gives a warning toast', async () => {
  
  render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    let username = screen.getByPlaceholderText('Username')
    let password = screen.getByPlaceholderText('Password')
    await userEvent.type(username, 'hello')
    await userEvent.type(password, 'hello')
    let loginButton = await screen.findAllByRole('button')
    userEvent.click(loginButton[1])
    let toasts = await screen.findAllByText('Invalid username or password')
    expect(toasts.length).toBeGreaterThan(0);
    
});

test('clicking login with correct credentials gives a success toast', async () => {

  render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    let username = screen.getByPlaceholderText('Username')
    let password = screen.getByPlaceholderText('Password')
    await userEvent.type(username, 'ben10')
    await userEvent.type(password, 'test')
    let loginButton = await screen.findAllByRole('button')
    userEvent.click(loginButton[1])
    // window alert "Login Successful!"
    let toasts = await screen.findAllByText('Login Successful!')
    expect(toasts.length).toBeGreaterThan(0); 
});