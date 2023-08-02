import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// const server = setupServer(
//   rest.get('http://localhost:3001/bases', (request, response, context) => {
//     const data = [
//       { baseId: 1, name: 'Patrick SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 2, name: 'Buckley SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 3, name: 'Peterson SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 4, name: 'Schriever SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 5, name: 'Los Angeles SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 6, name: 'Vandenberg SFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 7, name: 'Beale AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 8, name: 'Travis AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 9, name: 'MacDill AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 10, name: 'Hickam AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 11, name: 'Scott AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 12, name: 'Andrews AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 13, name: 'Nellis AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 14, name: 'Cannon AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 15, name: 'Tinker AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 16, name: 'Shaw AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 17, name: 'Hill AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 18, name: 'Kadena AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 19, name: 'Osan AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' },
//       { baseId: 20, name: 'Aviano AFB', created_at: '2023-08-02T14:07:38.052Z', updated_at: '2023-08-02T14:07:38.052Z' }
//     ];    
//     return response(context.json(data))
//   })
// )


// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

test('placeholder', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
       <App />
     </MemoryRouter>
  );
  expect(true).toBe(true)
})

// test('renders the header when not logged in', async () => {
//   render(
//     <MemoryRouter initialEntries={['/']}>
//        <App />
//      </MemoryRouter>
//   );
//   const titleElement = await screen.findAllByText('Lemon Drop');
//   const statusElement = screen.getByText('You are not logged in');
//   expect(titleElement[0]).toBeInTheDocument();
//   expect(statusElement).toBeInTheDocument();
// });

// test('renders the filters section', () => {
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
//   const chooseElement = screen.getByText('Choose a Vehicle');
//   const instructionsElement = screen.getByText('Select a vehicle to start filtering!');
//   expect(chooseElement).toBeInTheDocument();
//   expect(instructionsElement).toBeInTheDocument();
// });

// test('renders the hamburger menu when not logged in', async () => {
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
//   const homeElement = screen.getByText('Home');
//   const loginElement = screen.getByText('Login');
//   const registerElement = screen.getByText('Register');
//   // const test = screen.getByAltText('test')

//   // await userEvent.click(screen.getByRole('button'))
//   expect(homeElement).toBeInTheDocument();
//   expect(loginElement).toBeInTheDocument();
//   expect(registerElement).toBeInTheDocument();
// });

// test('login router routes', async () => {
//   render(
//     <MemoryRouter initialEntries={['/login']}>
//       <App />
//     </MemoryRouter>
//   );

//   expect(screen.getByText('Lemon Drop Login')).toBeInTheDocument();
// });

// test('register router routes', async () => {
//   render(
//     <MemoryRouter initialEntries={['/register']}>
//       <App />
//     </MemoryRouter>
//   );

//   expect(screen.getByText('Lemon Drop User Registration')).toBeInTheDocument();
// });
