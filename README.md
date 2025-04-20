# The Book Repository
## The Frontend Client

This is a frontend Client to a BookStore API that I have earlier developed.
The API is connected to an online cluster within MongoDB that is deployed online.

This is a very simple frontend client that shows one pages regarding all the CRUD functionalitys that are used with the API.

### Features
- Full CRUD support (Create, Read, Update, Delete)
- Fetches and displays the following datatypes from the API (Orders, Reviews, Books and Users)
- Clean and minimal interface to interact with the backend
- I have built two versions of this frontend client
- 1. The first Frontend client is built with pure Jquery, html and scss
- 2. The Second Frontend client is built with Typescript and scss
- The deployed version is the JQuery ones.

## Install the bookstore frontend client
### Jquery
Clone the repository to your local machine:
~~~
git clone https://github.com/TryFailCryTryAgain/u06-Front.git
~~~
- Get to the branch Jquery, and start your local server with the index.html file
- Then the script will run automatically in chrome

### Typescript
~~~
git clone https://github.com/TryFailCryTryAgain/u06-Front.git
~~~
- Get the branch Typescript down to your local machine
- Run the following command
~~~
cd typescript
npm install
~~~
Convert the .ts files into .js so it can run
~~~
npm run build
~~~
Then navigate to your index.html file and start your local host server
