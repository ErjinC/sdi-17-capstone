## Maximum Bandwidth presents... Lemon Drop - Online Military-Wide Lemon Lot
![Alt text](/frontend/public/lemonlogo.png)
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies_used](#Technologies used)
- [Setup](#Setup)
- [Developers](#Developers)

## Description
Maximum Bandwidth aims to give service members an accessible way to find and
interact with their bases' lemon lot, as well as other bases' lemon lots. Users will be
able to view listings, add listings, and manage their accounts for whenever their base/location changes.

Military members want an easy way to find a vehicle at an affordable price or sell their
vehicle, typically when they PCS in/out. A "lemon lot" is what military members use to
achieve this, but it is not a very well known tool and can quickly die due to not enough
members knowing about it.


## Installation

Fork and clone this repository to your local project directory and run `npm i` inside both the frontend and backend folders

```bash
npm i
git add README.md
git commit -m "Use README Boilerplate"
git clone https://github.com/YOUR-USERNAME/repository-name
```

## Usage

The application has the following features:
- All users can view all listings on the home page.
- All users can use the filters to sort through vehicles, makes models, years, locations, types, price, location, and condition
- Users who are logged in will have their location filter default to their location
- All users can click on a listing to see more information about the vehicle listed and the seller's contact information
- All users can navigate the website using the hamburger dropdown menu on the lefthand side of the screen
- Users who do not have an account can register for one

- Users who are not logged in but have an account can login to access additional features
- Users who are logged in can report a listing or add it to their favorites while looking at the listing's detailed view
- Users can only report a listing once
- Users who are logged in can see all of their open and sold/closed listings in "My Listings"
- Users who are logged in can mark a vehicle as sold in the detailed view of a listing under "My Listings"
- Users who are logged in can delete a vehicle in the detailed view of a listing under "My Listings"
- Users who are logged in can edit their listing in the detailed view of a listing under "my Listings"
- Doing any of the previous three actions will update the database and the available listings will update accordingly
- Users who are logged in can create a listing in the "My Listings" page, where they can create a listing for a car,
motorcycle, RV, boat, or trailer.
- Users who are logged in can view their personal/account details in the "Profile" page
- Users who are logged in can change their password, edit their information, or delete their account in the "Profile"
- Users who edit their information will update the database. Editing the email and phone number will update your listings
- Users who are logged in can view and remove their favorited listings in the "Profile" page

- Administrators can access admin tools in the "Admin" page
- Only administrators can see and access the "Admin" page
- Administrators can view reported listings, manage all accounts, and manage the list of bases in the "Admin" page
- Administrators can view all listings that have been reported by a user and delete or approve them as necessary
- Administrators can view and manage all accounts in the database; they can see their details, give them admin status, or delete the account
- Administrators can view, add, and delete all bases in the database
- Users who are logged in can log out

## Technologies used:
```bash
JavaScript
React
PostgreSQL
Docker
Chakra
Material UI
```



## Developers:
```bash
Andrew Galbraith
Anthony Gravante
Ben Lesko
Erjin Choi
Kevin Cagle
Moses Jackson
```

