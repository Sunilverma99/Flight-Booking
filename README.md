# Flight Booking App

Welcome to the Flight Booking App! This application allows users to search for flights, book tickets, and manage their bookings. It also provides an admin interface for managing flights and viewing bookings.

## Table of Contents

- [Introduction](#introduction)
- [Types of Users](#types-of-users)
- [User Use Cases](#user-use-cases)
- [Admin Use Cases](#admin-use-cases)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Flight Booking App is designed to provide a seamless experience for booking flights. Users can search for flights based on date and time, book tickets, and view their bookings. Admins can manage flight schedules and view all bookings.

## Types of Users

### User
- Regular users who can search for flights, book tickets, and manage their bookings.

### Admin
- Administrators who can manage flight schedules and view all bookings.

## User Use Cases

### Login
- Users can log in to their accounts to access the booking features.

### Sign up
- New users can create an account to start booking flights.

### Searching for flights based on date and time
- Users can search for available flights by providing the origin, destination, date, and time.

### Booking tickets on a flight based on availability
- Users can book tickets for a flight if seats are available (default seat count is 60).

### My Booking
- Users can view a list of all their bookings.

### Logout
- Users can log out of their accounts.

## Admin Use Cases

### Login
- Admins have a separate login interface to access admin functionalities.

### Add Flights
- Admins can add new flights to the system.

### Remove flights
- Admins can remove existing flights from the system.

### View all bookings based on flight number and time
- Admins can view all bookings for a specific flight.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/flight-booking-app.git
    cd flight-booking-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
      ```
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      PORT=5000
      ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5000`.
2. Sign up as a new user or log in if you already have an account.
3. Use the search feature to find flights based on your preferences.
4. Book tickets for available flights.
5. Visit the "My Booking" page to view your bookings.
6. Admins can log in through the admin interface to manage flights and view bookings.



## Contributing

We welcome contributions to improve the Flight Booking App. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using the Flight Booking App! We hope you have a great experience. If you have any questions or feedback, please feel free to reach out.
