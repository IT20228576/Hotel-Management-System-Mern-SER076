# Hotel-Management-System-SER076

## Introduction to the Project

This project is based on a hotel reservation system. It provides a platform for customers to reserve rooms directly with the hotel online easily and conveniently without having to visit the hotel physically.

There are four main functionalities we identified in this system,
   1.	User Management
   2.	Reservation Management
   3.	Room Management
   4.	Event Management
   
These functionalities are mainly distributed between two primary roles, which are the customer and the hotel administrator.

Customers can view the hotel rooms and as an additional feature, they can also view the events happening in the hotel and participate in them if needed. To reserve a room, a customer must be a registered customer in the hotel. After registering, they can log in by entering their account credentials. 
Once a customer selects a room that he/she prefers, they can make a reservation. When reserving a room, he can even make multiple reservations as long as the dates won’t clash. After a successful reservation, the customer will receive an email with the reservation details. 

The hotel administrators are capable of handling all four main functionalities of the system. They can add, update, and delete customers/admins, the information about rooms, reservations, and events. The system can also be used to generate meaningful reports for the convenience of the hotel management.

## Technologies and Tools

MERN Stack (MongoDB, Express, React JS, Node JS), GitHub, Azure Boards, Selenium, SonarQube

## Group Details

Group Leader - IT20228576 - Jayawardena C.P.U (IT20228576)

Member 2     - IT20123468 - Senaweera T.I.S (ishmaSenaweera)

Member 3     - IT19087252 - Weeratunga G. S (sathmini)

Member 4     - IT20152864 - Perera K. A. P. M (PasinduPerera10)

## Sample Admin Login Details

### Admin

1. name = John , email = john@doe.com , password = 123@Testing
2. name = Michael , email = Michael@Walker.com , password = 123@Testing

## Getting Started

To run project follow these simple example steps.

### Start Without Using Docker

#### Backend side

1. Go to backend folder
   ```sh
   cd backend
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Start the server
   ```sh
   npm start
   ```

#### Frontend side

1. Go to frontend folder
   ```sh
   cd frontend
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Start the server
   ```sh
   npm start
   ```
4. View frontend in the browser

   Defualt (http://localhost:3000) or in the terminal , a link will desplay to the frontend.
   
### Add Admins Seeds to the Database

1. Go to the backend folder
   ```sh
   cd backend
   ```

2. Run seeds.js file
   ```sh
   npm run seed
   ```
