# Reframery Marketplace

## Technologies Used

| Technology | Purpose |
| ---------- | ------- |

## Installation

```
npm i
```

## Available Commands

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start the development server (http://localhost:3000) |
| `npm run lint`    | Run the linter                                       |
| `npm run build`   | Build the app for production                         |
| `npm run preview` | Preview the production build (http://localhost:4173) |

## Run Locally

### 1. Run Frontend

```
$ git clone https://github.com/MacAquafina/reframery-frontend.git
# open new terminal
$ cd reframery-frontend
$ npm install
$ npm start
```

_NOTE_: If the browser asks for a username and password, input

```
{
username: "access_key_admin",
password: "secret_key_hush"
}
```

## 2 Signin Sample Account

### 2.1 Sign in as a manager

email: manager01@gmail.com

password: AAaa11

### 2.2 Sign in as an administrator

email: admin01@gmail.com

password: AAaa11

### 2.3 Sign in as a client user(seller and buyer)

email: user001@gmail.com

password: AAaa11

## 3 Home page, register, signin

### 3.1 Reframery Homepage

You can click the community name to enter a community home page, we currently just have sample data in the community of Canada.

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/Homepage.PNG)

### 3.2 Home Page for Canada

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/Community-home-page.PNG)

### 3.3 Register Page

You can create a new account in the register page

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/Registerpage.PNG)

### 3.4 Singin Page

You can use the previous sample account to sign in or use your own account created in the register page

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/Signinpage.PNG)

## 4 Manager permissions

### 4.1 My Admin page

You can view how many user in the system(the function have not been done yet).

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/ManagerUserPage.PNG)

### 4.2 Awaiting validation page

You can view a list of invalidated users, you can click the Validate button to validate the user, after that, refresh the page, then the user who you are validating will not be shown in this page.

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/ManagerUser-ValidateUsersPage.PNG)

### 4.3 Update User Balance and lock/unlock a user

- Enter a validated user email(for example: user007@gmail.com, user008@gmail.com, user009@gmail.com) and click the Search button to go to a new page,  
  where the manager can update the user's balance and ban the user.
- Enter a number in the input box, and click Add or Deduct button to add balance to user or deduct balance from user
- Click the ban button, the Status will change to be locked.
- You can search the user again to see the the changes of Current Credit and Status.

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/ManagerUser-UpdateUserBalancePage.PNG)
![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/ManagerUser-UpdateUserBalance-InvalidateUser.PNG)

### 4.4 Administrator Management page

You can click the Promote As Manger button to promote a administrator to manager or click the link(create a new administrator) to create a new administrator.

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/ManagerUser-ManagerAdmins.PNG)

### 4.5 Administrator Management page

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/ManagerUser-AccountSetting.PNG)

## 5 Administrator permissions

The administrator has no permission for update user balance and manage administrators.

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/AdminstratorUserPage.PNG)

## 6 buyer and seller Permissions

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/SigninUserPage.PNG)

### 6.1 Purchase Process ------------Shanghong

### 6.2 Account Setting

You can update your personal information by entering a new value for the labels and then click the Add or Update button. You need to refresh the page to see the updating information.

![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/MyprofilePage.PNG)

### 6.3 Wallet ------------Weijie

You can check your balance and transaction details here.
![avatar](https://github.com/LiyangW/Ingenuity-Incubator-4zp6/blob/master/src/img/screenshot/mywallet.png)

### 6.4 History ------------Shanghong

### 6.5 My Item ------------Kexin

### 6.6 My Cart ------------Shanghong
