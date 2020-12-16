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

## Job Title
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

