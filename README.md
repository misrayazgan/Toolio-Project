# Toolio Project

## Description

This project is a web application which provides an interface to search the products in the Toolio Shopify store by their titles, and displays the resulting products.

## Server for the toolio-shopify-app with Node.js

### Project setup

Install the dependencies listed in the package.json file with the following command:

```
npm install
```

### Configuration

Before running the server, create a `.env` file under the `server` directory and set the keys specified below.

```
PORT=    # e.g. 3000
API_KEY=
PASSWORD=
```

### Run

Start the server with the following command:

```
node app.js
```

### Example

Below is the url for searching for the products containing "awesome" keyword in the title. It should be noted that search results are not case-sensitive.

```
http://localhost:3000/products?title=awesome
```



## toolio-shopify-app with Vue.js

### Project setup

Install the dependencies listed in the package.json file with the following command:

```
npm install
```

### Configuration

Before running, create a `.env` file under the `toolio-shopify-app` directory and set the keys specified below.

```
VUE_APP_API_BASE_URL=    # e.g. http://localhost:3000
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

