import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App.js';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import { setupWorker, rest } from 'msw'
import { setupServer } from 'msw/node'


const server = setupServer(
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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders car card', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      let cars = await screen.findAllByText('2008 Toyota Camry')
      expect(cars.length).toBeGreaterThan(0);
  });

  test('renders boat card', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      let cars = await screen.findAllByText('2021 Yamaha FX Cruiser SVHO')
      expect(cars.length).toBeGreaterThan(0);
  });
  test('renders motorcycle card', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      let cars = await screen.findAllByText('2018 Triumph Tiger 800')
      expect(cars.length).toBeGreaterThan(0);
  });
  test('renders rv card', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      let cars = await screen.findAllByText('2023 Forest River Georgetown')
      expect(cars.length).toBeGreaterThan(0);
  });
  test('renders trailer card', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      let cars = await screen.findAllByText('2021 Continental Cargo Auto Master')
      expect(cars.length).toBeGreaterThan(0);
  });

  test('renders detailed view', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      // let cars = await screen.findAllByText('2008 Toyota Camry')
      // console.log(cars)
      let button = await screen.findAllByTestId('detailView')
      // console.log(button)
      userEvent.click(button[0])
      
      expect(screen.getByText('No AC. Runs well. Needs new tires')).toBeInTheDocument()
  });

  test('filters by vehicle', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      // let cars = await screen.findAllByText('2008 Toyota Camry')
      // console.log(cars)
      let select = await screen.findAllByTestId('vehicleSelect')
      fireEvent.change(select[0], {target: {value: 'car'}})
      userEvent.selectOptions(select[0], ['Cars'])

      let shouldBeAvailable = await screen.findAllByText('2008 Toyota Camry')
      console.log(shouldBeAvailable)
      // userEvent.click(button[0])
      expect(shouldBeAvailable[0]).toBeInTheDocument()
      expect(screen.queryByText('2023 Forest River Georgetown')).not.toBeInTheDocument()
  });

  // fireEvent.change(getByTestId('select'), { target: { value: 2 } })
  // let options = getAllByTestId('select-option')
  // expect(options[0].selected).toBeFalsy();
  // expect(options[1].selected).toBeTruthy();
  // expect(options[2].selected).toBeFalsy();
