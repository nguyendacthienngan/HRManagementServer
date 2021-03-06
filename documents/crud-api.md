# API Document for CRUD
## Note
API general format: http-method/api-version/object/action
Whereas:
* http-method: GET/, POST/, PUT/, DELETE/
* api-version: v1, v2, ...
* object: employees, candidates, ...
* action: add, update, delete

The version of API will be noted at the very first of any document, after this section
## Version
API version: v1

## Employee

<details>
  <summary>Expand</summary>

### Create
POST/v1/employees/add

<details>
  <summary>Body JSON</summary>
  
```
{
  "manager_id": int,
  "first_name": string,
  "last_name": string,
  "national_id": string,
  "employ_type": int,
  "job_title_id": int,
  "salary_coefficient_id": int,
  "birth_date": date,
  "gender": int,
  "marital_status": int,
  "address": string,
  "email": string,
  "contact_id": int
}
```

</details>

Return codes: 
* 201: Created
* 500: Internal Server Error (unexpected error)
* Created content

### Update
PUT/v1/employees/update

<details>
  <summary>Body JSON</summary>
  
```
{
  "employee_id": int,
  "manager_id": int,
  "first_name": string,
  "last_name": string,
  "national_id": string,
  "employ_type": int,
  "job_title_id": int,
  "salary_coefficient_id": int,
  "birth_date": date,
  "gender": int,
  "marital_status": int,
  "address": string,
  "email": string,
  "contact_id": int
}
```

</details>

Return codes:
* 200: OK
* 404: Not Found
* 500: Internal Server Error (unexpected error)
* Updated content

### Read: individual
GET/v1/employees/:id

### Read: entire
GET/v1/employees/

### Delete
DELETE/v1/employees/delete/:id

</details>

## Job Title

<details>
  <summary>Expand</summary>

### Create
POST/v1/jobtitles/add

<details>
  <summary>Body JSON</summary>
  
```
{
  "title_name": string
}
```

Return codes:
* 201: Created
* 500: Internal Server Error (unexpected error)
* Created content

</details>

### Update
PUT/v1/jobtitles/update

<details>
  <summary>Body JSON</summary>
  
```
{
  "title_id": int,
  "title_name": string
}
```

</details>

Return codes:
* 200: OK
* 404: Not Found
* 500: Internal Server Error (unexpected error)
* Updated content

### Read: individual
GET/v1/jobtitles/:id

### Read: entire
GET/v1/jobtitles/

### Delete
DELETE/v1/jobtitles/delete/:id

</details>

## Phone Number

<details>
  <summary>Expand</summary>

### Create
POST/v1/contacts/add

<details>
  <summary>Body JSON</summary>
  
```
{
  "emergency_call": string,
  "personal_call": string
}
```

Return codes:
* 201: Created
* 500: Internal Server Error (unexpected error)
* Created content

</details>

### Update
PUT/v1/contacts/update

<details>
  <summary>Body JSON</summary>
  
```
{
  "phone_id": int,
  "emergency_call": string,
  "personal_call": string
}
```

</details>

Return codes:
* 200: OK
* 404: Not Found
* 500: Internal Server Error (unexpected error)
* Updated content

### Read: individual
GET/v1/contacts/:id

### Read: entire
GET/v1/contacts/

### Delete
DELETE/v1/contacts/delete/:id

</details>

## Salary Coefficient

<details>
  <summary>Expand</summary>

### Create
POST/v1/salaries/add

<details>
  <summary>Body JSON</summary>
  
```
{
  "job_title_id": int,
  "value": decimal
}
```

Return codes:
* 201: Created
* 500: Internal Server Error (unexpected error)
* Created content

</details>

### Update
PUT/v1/salaries/update

<details>
  <summary>Body JSON</summary>
  
```
{
  "coefficient_id": int,
  "job_title_id": int,
  "value": decimal
}
```

</details>

Return codes:
* 200: OK
* 404: Not Found
* 500: Internal Server Error (unexpected error)
* Updated content

### Read: individual
GET/v1/salaries/:id

### Read: entire
GET/v1/salaries/

### Delete
DELETE/v1/salaries/delete/:id

</details>

## Candidate Status

<details>
  <summary>Expand</summary>

### Create
POST/v1/statuses/add

<details>
  <summary>Body JSON</summary>
  
```
{
  "status_name": string
}
```

Return codes:
* 201: Created
* 500: Internal Server Error (unexpected error)
* Created content

</details>

### Update
PUT/v1/statuses/update

<details>
  <summary>Body JSON</summary>
  
```
{
  "status_id": int,
  "status_name": string
}
```

</details>

Return codes:
* 200: OK
* 404: Not Found
* 500: Internal Server Error (unexpected error)
* Updated content

### Read: individual
GET/v1/statuses/:id

### Read: entire
GET/v1/statuses/

### Delete
DELETE/v1/statuses/delete/:id

</details>

## Candidate

<details>
  <summary>Expand</summary>

### Create
POST/v1/candidates/add

<details>
  <summary>Body JSON</summary>
  
```
{
  "first_name": string,
  "last_name": string,
  "national_id": string,
  "employ_type": int,
  "position": int,
  "birth_date": date,
  "gender": int,
  "candidate_status": int,
  "email": string
}
```

Return codes:
* 201: Created
* 500: Internal Server Error (unexpected error)
* Created content

</details>

### Update
PUT/v1/candidates/update

<details>
  <summary>Body JSON</summary>
  
```
{
  "candidate_id": int,
  "first_name": string,
  "last_name": string,
  "national_id": string,
  "employ_type": int,
  "position": int,
  "birth_date": date,
  "gender": int,
  "candidate_status": int,
  "email": string
}
```

</details>

Return codes:
* 200: OK
* 404: Not Found
* 500: Internal Server Error (unexpected error)
* Updated content

### Read: individual
GET/v1/candidates/:id

### Read: entire
GET/v1/candidates/

### Delete
DELETE/v1/candidates/delete/:id

</details>
