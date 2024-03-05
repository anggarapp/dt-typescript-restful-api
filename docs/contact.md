# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header : 
- X-API-TOKEN : token

Request Body : 
```json
{
    "first_name":"raggna",
    "last_name":"gresyash",
    "email":"gresyashish@mail.com",
    "phone":"000000000000",
}
```

Response Body (Success) :

```json
{
    "data":{
        "id" : 1,
        "first_name":"raggna",
        "last_name":"gresyash",
        "email":"gresyashish@mail.com",
        "phone":"000000000000",
    },
    
```

Response Body (Failed) :
```json
{
    "data": {
        "errors" : "Error Message,....."
    },
}
```
## Get Contact

Endpoint : GET /api/contacts/:id

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data":{
        "id" : 1,
        "first_name":"raggna",
        "last_name":"gresyash",
        "email":"gresyashish@mail.com",
        "phone":"000000000000",
    },
    
```

Response Body (Failed) :
```json
{
    "data": {
        "errors" : "Error Message,....."
    },
}
```
## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header : 
- X-API-TOKEN : token

Request Body : 
```json
{
    "first_name":"raggna",
    "last_name":"gresyash",
    "email":"gresyashish@mail.com",
    "phone":"000000000000",
}
```

Response Body (Success) :

```json
{
    "data":{
        "id" : 1,
        "first_name":"raggna",
        "last_name":"gresyash",
        "email":"gresyashish@mail.com",
        "phone":"000000000000",
    },
    
```

Response Body (Failed) :
```json
{
    "data": {
        "errors" : "Error Message,....."
    },
}
```
## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data":"OK",
    
```

Response Body (Failed) :
```json
{
    "data": {
        "errors" : "Error Message,....."
    },
}
```
## Search Contact

Endpoint : GET /api/contacts

Query Parameters :
- name : string, contact first name or contact last name , optional
- phone : string, contact phone , optional
- email : string, contact mail , optional
- page : number, default 1
- size : number, default 10

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data":[
        {
            "id" : 1,
            "first_name":"raggna",
            "last_name":"gresyash",
            "email":"gresyashish@mail.com",
            "phone":"000000000000",
        },
        {
            "id" : 2,
            "first_name":"gael",
            "last_name":"soulish",
            "email":"soulish@mail.com",
            "phone":"000099900000",
        },
    ],
    "paging" : {
        "current_page" : 1,
        "total_page" : 10,
        "size" : 10,
    }
    
```

Response Body (Failed) :
```json
{
    "data": {
        "errors" : "Error Message,....."
    },
}
```