# Express Weather API

This is an Express.js application that provides a simple API to greet a visitor and display the current temperature
based on their IP address. The application uses the `axios` library to make HTTP requests to two external
APIs: `ipapi.co` for IP geolocation and `OpenWeatherMap` for weather data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/johnkrator/get-ip-address.git
   cd get-ip-address
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

To start the server, run:

```bash
npm run backend
```

By default, the server will run on port 3000. You can access the application at `http://localhost:3000`.

## API Endpoints

### GET /

Returns a simple "Hello World!" message.

#### Example Request

```http
GET / HTTP/1.1
Host: localhost:3000
```

#### Example Response

```http
HTTP/1.1 200 OK
Content-Type: text/plain

Hello World!
```

### GET /api/hello

Returns a greeting message along with the temperature based on the visitor's IP address.

#### Query Parameters

- `visitor_name` (optional): The name of the visitor. Defaults to "Guest".

#### Example Request

```http
GET /api/hello?visitor_name=John HTTP/1.1
Host: localhost:3000
```

#### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "client_ip": "203.0.113.195",
  "location": "San Francisco",
  "greeting": "Hello, John! The temperature is 20 degrees Celsius in San Francisco"
}
```

## Environment Variables

The application uses the following environment variables:

- `weatherApiKey`: Your OpenWeatherMap API key.

To set these variables, create a `.env` file in the root directory of your project:

```
weatherApiKey=your_openweathermap_api_key
```

## Error Handling

If an error occurs during the processing of the request, the server will respond with a JSON object containing the error
details.

#### Example Response

```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "An error occurred while processing your request",
  "details": "Detailed error message"
}
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code
follows the project's coding standards and includes tests for new functionality.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
