# TicketGhar  | [Live Project](https://ticket-ghar.netlify.app/)

## Introduction
### Following features are added in this project:
+ Fully responsive site
+ User can register/login and also reset their password if forgotten
+ User can also login using their google account
+ Movies can be searched by its name
+ Online ticket can be booked by making online payment 
+ Interested user can also get their theatre added by getting approval by Admin
+ Movies are added by Admin

### Tech Stack Used:
+ ReactJs: Main frontend framework
+ Redux Toolkit: State management tool
+ Ant D: Component based library
+ Node.js: Backend runtime environment
+ Express.js: Routing purpose
+ MongoDB: Database 

## Contributors
+ [Dev Prakash](https://github.com/devprakashdp2021)
+ [Himanshu Kumar](https://github.com/agarwalhimanshugaya)
## Setup
1. Clone the project in your system and head to the directory where you saved the project.
2. Install "node modules" in server as well as client directory by running "npm install" in the corresponding location path.
3. Add your mongo_uri, jwt_secret, stripe_key, adminUsername, adminPassword, GOOGLE_CLIENT_ID token in an .env file in server directory.
4. Also add GOOGLE_CLIENT_ID token in an .env file in client directory.
5. start the server by running "nodemon server" commmand in server directory.
6. start the client side by running "npm start" command in client directory.

**.env file structure**

**Note:** adminUsername and adminPassword is used to send the mail in case of forgot password to reset the password and one can find the adminPassword from the adminUserName gmail account from App Password feature of Gmail.
```
mongo_uri = ""
jwt_secret = ""
stripe_key = ""
adminUsername = ""
adminPassword = ""
GOOGLE_CLIENT_ID = ""
```

#### ScreenShot 
![1](https://github.com/devprakashdp2021/Ticket-Ghar/assets/97429564/215d1735-3a04-4fd8-970c-c559a984d219)
![2](https://github.com/devprakashdp2021/Ticket-Ghar/assets/97429564/2e170661-d3b8-4c55-a5cf-37a1619ebc8b)
![3](https://github.com/devprakashdp2021/Ticket-Ghar/assets/97429564/bbb4ae88-fb6f-4c8d-ba5e-9b7894d7e6c8)
![6](https://github.com/devprakashdp2021/Ticket-Ghar/assets/97429564/ea0a38d9-1844-4e0b-a94a-125c46a43ec2)
![4](https://github.com/devprakashdp2021/Ticket-Ghar/assets/97429564/f488d6d3-d19f-4a06-827b-9ec7c21e8e0c)
![5](https://github.com/devprakashdp2021/Ticket-Ghar/assets/97429564/7b3d991b-e0fc-4f06-9ac5-a25146a98cc8)
![7](https://github.com/devprakashdp2021/Ticket-Ghar/assets/97429564/2026ae6a-c5de-4902-9b8b-7404c9c68fd9)
![8](https://github.com/devprakashdp2021/Ticket-Ghar/assets/97429564/df67aca7-db9f-440f-b0e2-09c3dff02a06)
![9](https://github.com/devprakashdp2021/Ticket-Ghar/assets/97429564/5a99fbc2-d579-4d04-bc1a-7d328313e023)







