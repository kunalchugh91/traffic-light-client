# TrafficLightClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Project Description
This is a simple project to simulate a traffic light system involving 3 traffic lights and 1 pedestrian signal. The traffic lights take turns to display green, yellow and red signals. If a pedestrian pushes the walk button, the traffic lights display red and a WALK sign is indicated on the pedestrian signal post. This project works by polling the next traffic signal state from a REST API every 3000ms. 

## Steps to run the project
1. Ensure the Spring REST API project is up and running on `localhost:8080`.
2. `npm -g @angular/cli`.
3. `npm install` to install all node packages.
4. `npm start` to run on `localhost:4200`.
5. `npm test` to run unit tests.
