# Box Score Client

This application is a client application consuming and dispaying game data for the Barstool Sports Box Score challenge. The associated API can be found [here](https://github.com/ckaminer/boxscore-api). To run the entire full stack application, please refer to the [API documentation](https://github.com/ckaminer/boxscore-api#using-docker-compose-full-stack-application).

## Getting Started

These instructions will assist you in retrieving a copy of the project in order to get it up and running for development and/or testing purposes.

### Built On

- [Node 10.15.3](https://nodejs.org/download/release/v10.15.3/)

### Installation

Clone repository:
```
git clone https://github.com/ckaminer/boxscore-client.git
```

### Running the Application
*NOTE*: This documentation includes instructions for running this application without the use of Docker. If you'd like to run this in a container please refer to the [API documentation](https://github.com/ckaminer/boxscore-api).

If you are running this without the use of Docker it is recommended that you follow the [instructions](https://github.com/ckaminer/boxscore-api#No-Container) to get the API running before you proceed.

Upon completion of the API setup you should now have a Mongo instance and API instance of the application running. During that setup you should have also set your ports you wish the application to run on. If you chose to run on anything other than the defaults, please set those ports in your client application shell as well.

API Server:
```
export BS_API_PORT=8081
```
Client Server:
```
export BS_CLIENT_PORT=8080
```

Retrieve dependencies (from the project root):
```
npm install
```

Start development server (from the project root):
```
npm start
```

Upon successful completion of the above steps, you should be able to view the application from your browser by visiting `http://localhost:${BS_CLIENT_PORT}`

## Running the tests

Unit tests (from the project root):
```
npm run test
```

Lint (from the project root):
```
npm run lint
```

Entire suite (from the project root):
```
npm run suite
```