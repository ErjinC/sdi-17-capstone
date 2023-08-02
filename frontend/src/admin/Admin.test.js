import { render, screen } from '@testing-library/react';
import Admin from './Admin';
import App from '../App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import { setupWorker, rest } from 'msw'
import { setupServer } from 'msw/node'
import { createContext } from 'react';

// { sessionStorage object
//   "userId": 1,
//   "username": "ben10",
//   "first_name": "Larry",
//   "last_name": "Llama",
//   "base": "Beale AFB",
//   "favorites": "1,2,3,4,5",
//   "admin": true,
//   "success": true
// }

function getUserInfo() {
  const currentUser = window.sessionStorage.getItem('CurrentUser');
  if (currentUser) {
    return JSON.parse(currentUser);
  }
  return {};
}

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
      favorites: "1,2,3,4,5"
    }
    let successBool;
    if (request.body[0].password === data.password) {
      successBool = true
    } else {
      successBool = false
    }
    return response(context.json({ success: true, ...data }))
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
  }),
  rest.get('http://localhost:3001/listings', (request, response, context) => {
    let carListings = [{
      "car_id": 1,
      "color": "red",
      "condition": "good",
      "created_at": "2023-08-01T14:50:30.104Z",
      "description": "No AC. Runs well. Needs new tires",
      "image": "https://placekitten.com/500/300",
      "listingId": 61,
      "location": "Beale AFB",
      "make": "Toyota",
      "mileage": 173495,
      "model": "Camry",
      "price": 3000,
      "reported": true,
      "sold": false,
      "transmission": "automatic",
      "type": "car",
      "updated_at": "2023-08-01T14:50:30.104Z",
      "user_id": 1,
      "year": 2008
    }]
    let boatListings = [{
      "boat_id": 10,
      "condition": "excellent",
      "created_at": "2023-08-01T14:50:30.111Z",
      "description": "Excellent condition, minimal use.",
      "hours": 30,
      "image": "https://placekitten.com/500/300",
      "listingId": 10,
      "location": "Dover AFB",
      "make": "Yamaha",
      "model": "FX Cruiser SVHO",
      "price": 17000,
      "reported": false,
      "sold": false,
      "type": "jet ski",
      "updated_at": "2023-08-01T14:50:30.111Z",
      "user_id": 10,
      "year": 2021
  }]
  
    let motoListings = [{
      "color": "white",
      "condition": "good",
      "created_at": "2023-08-01T14:50:30.117Z",
      "description": "Good condition, minor wear from use.",
      "image": "https://placekitten.com/500/300",
      "listingId": 86,
      "location": "Elmendorf AFB",
      "make": "Triumph",
      "mileage": 3500,
      "model": "Tiger 800",
      "motorcycle_id": 6,
      "price": 11500,
      "reported": false,
      "sold": false,
      "type": "Adventure Bike",
      "updated_at": "2023-08-01T14:50:30.117Z",
      "user_id": 6,
      "year": 2018
  }]
  
    let rvListings = [{
      "condition": "excellent",
      "created_at": "2023-08-01T14:50:30.128Z",
      "description": "Spacious and luxurious motorhome with multiple slide-outs. Modern amenities and entertainment options. Great for full-time living or extended vacations. Immaculate condition with low mileage.",
      "image": "https://placekitten.com/500/300",
      "length": 36,
      "listingId": 25,
      "location": "Luke AFB",
      "make": "Forest River",
      "mileage": 18700,
      "model": "Georgetown",
      "price": 210000,
      "reported": false,
      "rv_id": 5,
      "sleeps": "6",
      "sold": false,
      "type": "motorized",
      "updated_at": "2023-08-01T14:50:30.128Z",
      "user_id": 5,
      "weight": 21000,
      "year": 2023
  }]
  
    let trailerListings = [{
      "condition": "excellent",
      "created_at": "2023-08-01T14:50:30.134Z",
      "description": "Like new, minimal use.",
      "image": "https://placekitten.com/500/300",
      "length": 24,
      "listingId": 46,
      "location": "Elmendorf AFB",
      "make": "Continental Cargo",
      "model": "Auto Master",
      "price": 7000,
      "reported": false,
      "sold": false,
      "trailer_id": 6,
      "type": "enclosed",
      "updated_at": "2023-08-01T14:50:30.134Z",
      "user_id": 6,
      "year": 2021
  }]
    
    return response(context.json( {carListings, boatListings, motoListings, rvListings, trailerListings} ))
  })
)

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock
});

beforeEach(() => {
  window.sessionStorage.clear();
  jest.restoreAllMocks();
  window.sessionStorage.setItem('CurrentUser', JSON.stringify({
    userId: 1,
    admin: true,
    username: "ben10",
    password: "test",
    first_name: "Larry",
    last_name: "Llama",
    base: "Beale AFB",
    favorites: "1,2,3,4,5",
    success: true
  }));
});
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should get user info from session storage', async () => {
  const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
  const actualValue = getUserInfo();
  expect(actualValue).toEqual({
    userId: 1,
    admin: true,
    username: "ben10",
    password: "test",
    first_name: "Larry",
    last_name: "Llama",
    base: "Beale AFB",
    favorites: "1,2,3,4,5",
    success: true
  });
  expect(getItemSpy).toBeCalledWith('CurrentUser');
});

test('should log in', async () => {
    render(
      <MemoryRouter initialEntries={['/admin']} initialIndex={0}>
        <App />
      </MemoryRouter>
    );

  expect(screen.getByText('Larry Llama')).toBeInTheDocument();

});

test('Reported listings render', async () => {
  render(
    <MemoryRouter initialEntries={['/admin']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

expect(screen.getByText('Reported Listings')).toBeInTheDocument();

});

test('Account management tab renders', async () => {
  render(
    <MemoryRouter initialEntries={['/admin']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

expect(screen.getByText('Account Management')).toBeInTheDocument();

});

test('Base management tab renders', async () => {
  render(
    <MemoryRouter initialEntries={['/admin']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

expect(screen.getByText('Base List Management')).toBeInTheDocument();

});