# Authentication Service

## Routes
### [POST user/register]
```
curl -v -H "Content-Type: application/json"  -X POST -d "{\"username\": \"username\", \"password\": \"password\"}" 127.0.0.1:8080/user/register
```

Returns:
```
{
    "message": String,
    "status": bool
}
```
### [POST user/login]
```
curl -v -H "Content-Type: application/json"  -X POST -d "{\"username\": \"username\", \"password\": \"password\"}" 127.0.0.1:8080/user/login
```
Returns:
```
{
    "status": bool
    "token": String
}
```
### [POST user/authenticate]
```
curl -X GET -H 'Content-Type: application/json' -H 'Authorization: Bearer TOKEN' -i 'http://127.0.0.1:8080/user/authenticate'

```
Returns: 
```
bool
```
or 
```
{
    "status": bool
    "message": String
}
```

## Dependencies
Before launching diesel cli must be installed:
```
cargo install diesel_cli --no-default-features --features postgres
```
and to create users table in database:
```
diesel migration run
```
