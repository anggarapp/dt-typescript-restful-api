# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
    "username" : "raggna",
    "password" : "placidusax",
    "name" : "raggna",
}
```

Response Body (Success) :

```json
{
    "data" : {
        "username" : "raggna",
        "name" : "raggna",
    },
}
```

Response Body (Failed) :

```json
{
    "errors" : "errors message, ...",
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username" : "raggna",
    "password" : "placidusax",
}
```

Response Body (Success) :

```json
{
    "data" : {
        "username" : "raggna",
        "name" : "raggna",
        "token" : "blablalbalblalabainuuid"
    },
}
```

Response Body (Failed) :

```json
{
    "errors" : "errors message, ...",
}
```

## Get User
Endpoint : GET /api/users/current

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "username" : "raggna",
    "password" : "placidusax",
}
```

Response Body (Success) :

```json
{
    "data" : {
        "username" : "raggna",
        "name" : "raggna",
    },
}
```

Response Body (Failed) :

```json
{
    "errors" : "errors message, ...",
}
```
## Update User
Endpoint : PATCH /api/users/current

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "name" : "raggna",
    "password" : "placidusax",
}
```

Response Body (Success) :

```json
{
    "data" : {
        "username" : "raggna",
        "name" : "raggna",
    },
}
```

Response Body (Failed) :

```json
{
    "errors" : "errors message, ...",
}
```
## Logout User
Endpoint : DELETE /api/users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : "OK"
}
```

Response Body (Failed) :

```json
{
    "errors" : "errors message, ...",
}
```