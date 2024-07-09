# USER

### baseUrl: https://api-product-tfw8.onrender.com

## SIGN IN

- METHOD: POST
- END POINT: /api/user/sign-in
- body:

```json
{
  "email": "string"
  "password": "string"
}
```

## SIGN UP

- METHOD: POST
- END POINT: /api/user/sign-up
- body:

```json
{
  "email": "string"
  "username": "string"
  "password": "string"
  "gender": "string"
  "province": "string"
  "dob": "string"
  "lastName": "string"
  "firstName": "string"
}
```

## GET-ME

- METHOD: POST
- END POINT: /api/user/get-me
- headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

# PRODUCT

## CREATE

- METHOD: POST
- END POINT: /api/product/create
- body:

```json
{
  "imageUrl": "string"
  "title": "string",
  "description": "string",
}
```

## UPDATE

- METHOD: PATCH
- END POINT: /api/product/update/:id
- body:

```json
{
  "imageUrl": "string"
  "title": "string",
  "description": "string",
}
```

## DELETE

- METHOD: DELETE
- END POINT: /api/product/delete/:id

## DELETE MANY

- METHOD: DELETE
- END POINT: /api/product/delete-many
- body:

```json
{
  "ids": ["string"] // mảng string id
}
```

## GET ALL

- METHOD: GET
- END POINT: /api/product/get-all
- params:

```json
{
  "page": "number"
  "limit": "number"
  "search": "string"
  "category": "string"
}
```
