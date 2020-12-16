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

Body JSON:
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

### Update
PUT/v1/employees/update

Body JSON:
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

### Read: individual
GET/v1/employees/:id

### Read: entire
GET/v1/employees/
