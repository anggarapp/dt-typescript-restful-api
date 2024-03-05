# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header : 
- X-API-TOKEN : token

Request Body : 

```json
{
    "street" : "Jalan",
    "city" : "Kota",
    "province" : "Provinsi",
    "country" : "Negara",
    "postal_code" : "908709809",

}
```

Response Body (Success) :
```json
{
    "data" : {
        "id" : 1,
        "street" : "Jalan",
        "city" : "Kota",
        "province" : "Provinsi",
        "country" : "Negara",
        "postal_code" : "908709809",
    }
}
``` 

Response Body (Failed) :
```json
{
    "errors" : "Error Message"
}
``` 

## Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :
```json
{
    "data" : {
        "id" : 1,
        "street" : "Jalan",
        "city" : "Kota",
        "province" : "Provinsi",
        "country" : "Negara",
        "postal_code" : "908709809",
    }
}
``` 

Response Body (Failed) :
```json
{
    "errors" : "Error Message"
}
``` 

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAddress

Request Header : 
- X-API-TOKEN : token

Request Body : 

```json
{
    "street" : "Jalan",
    "city" : "Kota",
    "province" : "Provinsi",
    "country" : "Negara",
    "postal_code" : "908709809",

}
```

Response Body (Success) :
```json
{
    "data" : {
        "id" : 1,
        "street" : "Jalan",
        "city" : "Kota",
        "province" : "Provinsi",
        "country" : "Negara",
        "postal_code" : "908709809",
    }
}
``` 

Response Body (Failed) :
```json
{
    "errors" : "Error Message"
}
``` 

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

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
    "errors" : "Error Message"
}
``` 

## List Address

Endpoint : GET /api/contacts/:idContact/addresses/

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :
```json
{
    "data" : [
        {
            "id" : 1,
            "street" : "Jalan",
            "city" : "Kota",
            "province" : "Provinsi",
            "country" : "Negara",
            "postal_code" : "908709809",
        },
        {
            "id" : 1,
            "street" : "Jalan",
            "city" : "Kota",
            "province" : "Provinsi",
            "country" : "Negara",
            "postal_code" : "908709809",
        },
    ]
}
``` 

Response Body (Failed) :
```json
{
    "errors" : "Error Message"
}
``` 