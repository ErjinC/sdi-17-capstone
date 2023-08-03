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


test('renders login card', async () => {
    render(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      );
      let text = await screen.findAllByText('Login')
      expect(text.length).toBeGreaterThan(0);

  });

test('clicking login without a username and password gives a warning toast', async () => {
  render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    let loginButton = await screen.findAllByRole('button')
    userEvent.click(loginButton[0])
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
    userEvent.click(loginButton[0])
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
    userEvent.click(loginButton[0])
    // window alert "Login Successful!"
    let toasts = await screen.findAllByText('Login Successful!')
    expect(toasts.length).toBeGreaterThan(0); 
});