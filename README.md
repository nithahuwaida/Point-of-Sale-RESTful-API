<h1 align="center">Point Of Sales App RESTful API </h1>

## Introduction

Point of sales RESTful API is an API that allows users to read product and genre categories from a database. Point of sales API also allows users to create, update, and delete a product and genre categories to / from the database.

There're some features included in the RESTful API which allow users to programmatically sort the products (based on name, category, or date updated ), add or reduce quantity a product, search a products (based on name) and pagination to products from database.There are also features Cross Origin Resource Sharing (CORS).

This documentation outlines the point of sales API functionality.

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.16.3-green.svg?style=rounded-square)](https://nodejs.org/) [![body-parser](https://img.shields.io/badge/bodyparser-v1.19-e)](https://www.npmjs.com/package/body-parser) [![MySQL](https://img.shields.io/badge/mysql-v3.2.2-blue)](https://www.npmjs.com/search?q=mysql)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://expressjs.com/en/starter/installing.html">Express JS </a>
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)
5. Text Editor (ex. Sublime Text, Visual Studio Code)

## Getting Started

![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)

### Node.js
Node.js is software designed to develop web-based applications and is written in the JavaScript programming language.

If all this time we know that JavaScript is a programming language that runs on the client / browser side only, then Node.js exists to complete the role of JavaScript so allow developers used javascript to write command line tools and for **server side scripting**. Nodejs use **V8** Javascript Engine, the same engine for Chrome and Chromium based browser used. The initial release of Nodejs in 2009 supported only Linux and Mac OS X. Later in July 2011, the first Nodejs build supporting Windows was released.

![express](https://expressjs.com/images/express-facebook-share.png)

### Express.js
Express.js, or simply Express, is a web application framework for Node.js.
It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.
![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)

### RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

Representational State Transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |
| `401` | `Unauthorized`       | The supplied API credentials are invalid                                            |
| `403` | `Forbidden`          | The credentials provided do not have permission to access the requested resource    |
| `404` | `Not found`          | An attempt was made to access a resource that does not exist in the API             |
| `405` | `Method not allowed` | The resource being accessed doesn't support the method specified (GET, POST, etc.). |
| `500` | `Server Error`       | An error on the server occurred                                                     |

## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:8080/product)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
PORT = '8080'

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_DATABASE = 'pos_app'
```

## Setup Database
You can write this code below on your Terminal with mysql cli or import it to **phpmyadmin**.

Create Database named **pos_app** :

```
CREATE DATABASE pos_app;
```

Create Table named **products** :

```
CREATE TABLE products (
    id_product INT(10) AUTO INCREMENT PRIMARY KEY,
    name_product VARCHAR(50),
    desc_product VARCHAR(255),
    image_product VARCHAR(255),
    id_category INT(10),
    price_product BIGINT(10),
    quantity_product INT(5),
    date_added TIMESTAMP,
    date_updated TIMESTAMP,
    FOREIGN KEY (products) REFERENCE categories(id_category)
);
```

Create Table named **categories** :

```
CREATE TABLE categories(
    id_category INT(10) AUTO INCREMENT PRIMARY KEY,
    name_category VARCHAR(25)
);
```
Create Table named **transaction** :

```
CREATE TABLE transactions(
    id_transcation INT(10) AUTO INCREMENT PRIMARY KEY,
    total_transaction INT(11),
    date_added TIMESTAMP
);
```
Create Table named **products_transactions** :

```
CREATE TABLE products_transaction(
    id_products_transaction INT(10) AUTO INCREMENT PRIMARY KEY,
    order_qty INT(10),
    price_product INT(10),
    subtotal_product INT(10),
    id_product INT(10),
    id_transaction INT(10),
    date_added TIMESTAMP
);
```
#### **CRUD Products Endpoint**
* **Read All Products**
  - **Request** : **`GET /products`**
  - **Response** :
```
{
    {
    "status": 200,
    "currentPage": 1,
    "limit": 10,
    "sort": "id_product",
    "order": "asc",
    "search": null,
    "response": [
        {
            "id_product": 1,
            "name_product": "Promo 99",
            "desc_product": "Promo Discount",
            "image_product": "https://ibb.co/4tRkbDB",
            "id_category": 1,
            "price_product": 99000,
            "quantity_product": 21,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-15T12:15:05.000Z",
            "name_category": "Menu Promo"
        },
        {
            "id_product": 2,
            "name_product": "Kids Meal Chicken Mix",
            "desc_product": "food for children",
            "image_product": "https://ibb.co/gJzxX84",
            "id_category": 5,
            "price_product": 40000,
            "quantity_product": 6,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-17T11:57:50.000Z",
            "name_category": "Kids Meal"
        },
        {
            "id_product": 3,
            "name_product": "Red Hot Chili Beef Bowl",
            "desc_product": "Reguler",
            "image_product": "https://ibb.co/gJzxX84",
            "id_category": 3,
            "price_product": 50000,
            "quantity_product": 2,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-17T12:04:03.000Z",
            "name_category": "Main Menu"
        },
        {
            "id_product": 4,
            "name_product": "Egg Mayo Tori Don",
            "desc_product": "Reguler",
            "image_product": "https://ibb.co/gJzxX84",
            "id_category": 4,
            "price_product": 33000,
            "quantity_product": 2,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-19T04:03:32.000Z",
            "name_category": "Snack and Oatmeal"
        },
        {
            "id_product": 5,
            "name_product": "Ocha Cold",
            "desc_product": "Medium",
            "image_product": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "price_product": 12000,
            "quantity_product": 2,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z",
            "name_category": "Drinks"
        }   ]
}
```
* **Read a product**
  - **Request** : **`GET /products/:id`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "Promo 99",
            "description": "Promo Discount",
            "imageURL": "https://ibb.co/4tRkbDB",
            "id_category": 1,
            "price": 99000,
            "quantity": 5,
            "date_added": "2019-10-15T11:59:19.000Z",
            "date_updated": "2019-10-18T14:38:18.000Z"
        }
    ]
}
```
* **Create a product**
  - **Request** : **`POST /products`**
  - **Response** :
```
{
    "status": 200,
    "message": "Product has successfully added!",
    "data": {
        "name_product": "Buble Gum",
        "desc_product": "Variant Strawberry",
        "image_product": "https://ibb.co/gJzxX84\n",
        "id_category": "12",
        "price_product": "1000",
        "quantity_product": "30"
    }
}
```
* **Update a product**
  - **Request** : **`PACTH /products/:id`**
  - **Response** :
```
{
    "status": 200,
    "message": "Product has successfully added!",
    "data": {
        "name_product": "Buble Gum",
        "desc_product": "Variant Strawberry",
        "image_product": "https://ibb.co/gJzxX84\n",
        "id_category": "12",
        "price_product": "1000",
        "quantity_product": "30"
    }
}
```
* **Delete a product** 
  - **Request** : **`DELETE /products/id`**
  - **Response** : 
```
{
    "status": 200,
    "id": "10",
    "message": "Product has been deleted!"
}
```

#### CRUD Categories Endpoint
* **Read All Categories**
  - **Request** : **`GET /categories`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "category": "Menu Promo"
        },
        {
            "id": 3,
            "category": "Main Menu"
        },
        {
            "id": 4,
            "category": "Snack and Oatmeal"
        },
        {
            "id": 5,
            "category": "Kids Meal"
        }
    ]
}
```
* **Read a category**
  - **Request** : **`GET /categories/:id`**
  - **Response** :
```
{
    "status": 200,
    "id": "9",
    "message": "Category successfully retrieved",
    "response": [
        {
            "id_category": 9,
            "name_category": "Bread",
            "date_added": "2019-10-20T06:25:39.000Z",
            "date_updated": "2019-10-20T06:42:55.000Z"
        }
    ]
}
```
* **Create a category** 
  - **Request** : **`POST /categories`**
  - **Response** :
```
{
    "status": 200,
    "message": "Category has successfully added!",
    "data": {
        "name_category": "Permen"
    }
}
```
* **Update a category**
  - **Request** : **`PATCH /categories/:id`**
  - **Response** :
```
{
    "status": 200,
    "message": "Category has successfully updated!",
    "id": "19",
    "data": {
        "name_category": "Mineral"
    }
}
```
* **Delete a Category** 
  - **Request** : **`DELETE /categories/:id`**
  - **Response** :
```
{
    "status": 200,
    "id": "8",
    "message": "Category has been deleted!"
}
```

#### Sorting The Product Endpoint

* **Sorting and Pagination the products**
  - **Request** : **`GET /products?sort=name_product&order=desc&page=2&limit=5`**
  - **Response** :
```
{
    "status": 200,
    "currentPage": "2",
    "limit": 5,
    "sort": "name_product",
    "order": "desc",
    "search": null,
    "response": [
        {
            "id_product": 12,
            "name_product": "Lolipop",
            "desc_product": "Variant Strawberry",
            "image_product": "https://ibb.co/gJzxX84\n",
            "id_category": 12,
            "price_product": 2000,
            "quantity_product": 30,
            "date_added": "2019-10-20T06:32:49.000Z",
            "date_updated": "2019-10-20T07:03:31.000Z",
            "name_category": "Bread"
        },
        {
            "id_product": 2,
            "name_product": "Kids Meal Chicken Mix",
            "desc_product": "food for children",
            "image_product": "https://ibb.co/gJzxX84",
            "id_category": 5,
            "price_product": 40000,
            "quantity_product": 6,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-17T11:57:50.000Z",
            "name_category": "Kids Meal"
        },
        {
            "id_product": 9,
            "name_product": "Ice Tea",
            "desc_product": "Cold",
            "image_product": "https://ibb.co/gJzxX84",
            "id_category": 7,
            "price_product": 12000,
            "quantity_product": 6,
            "date_added": "2019-10-16T09:24:23.000Z",
            "date_updated": "2019-10-16T09:24:23.000Z",
            "name_category": "Drinks"
        },
        {
            "id_product": 4,
            "name_product": "Egg Mayo Tori Don",
            "desc_product": "Reguler",
            "image_product": "https://ibb.co/gJzxX84",
            "id_category": 4,
            "price_product": 33000,
            "quantity_product": 2,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-19T04:03:32.000Z",
            "name_category": "Snack and Oatmeal"
        },
        {
            "id_product": 13,
            "name_product": "Buble Gum",
            "desc_product": "Variant Strawberry",
            "image_product": "https://ibb.co/gJzxX84\n",
            "id_category": 12,
            "price_product": 1000,
            "quantity_product": 30,
            "date_added": "2019-10-20T06:32:49.000Z",
            "date_updated": "2019-10-20T07:03:31.000Z",
            "name_category": "Bread"
        }
    ]
}
```
**ADD and Reduce Quantity of Products** 
* **ADD Quantity**
  - **Request** : **`PUT /products/qty/1`**
  - **Response** : 
```
{
    "status": 200,
    "message": "Add quantity product succesfully"
}
```
* **Reduce Quantity with Trigger in MySQL**
```
    "CREATE TRIGGER `UpdateQuantity` AFTER INSERT ON `products_transactions` 
    FOR EACH ROW BEGIN UPDATE products SET quantity_product=quantity_product-new.order_qty WHERE id_product=NEW.id_product; END"
```
* **Search a Products (based on name)**
  - **Request** : **`GET /products?search=kids`**
  - **Response** : 
```
{
    "status": 200,
    "currentPage": 1,
    "limit": 10,
    "sort": "id_product",
    "order": "asc",
    "search": "kids",
    "response": [
        {
            "id_product": 2,
            "name_product": "Kids Meal Chicken Mix",
            "desc_product": "food for children",
            "image_product": "https://ibb.co/gJzxX84",
            "id_category": 5,
            "price_product": 40000,
            "quantity_product": 6,
            "date_added": "2019-10-15T12:14:19.000Z",
            "date_updated": "2019-10-17T11:57:50.000Z",
            "name_category": "Kids Meal"
        }
    ]
}
```
* **Code Program Cross Origin Resource Sharing (CORS)**
    - Testing with your Ip Local : http://196.152.8.111:8080/products
    - Edit the url server address = http://localhost:8080/products
```
server.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*'); //All client
	res.header('Access-Control-Allow-Header',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
	if(req.methode==='OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT,POST, PATCH, DELETE, GET');
		return form.success(res,200, response)	
	}
	next();
})
```