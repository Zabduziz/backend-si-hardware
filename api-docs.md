# API Documentation - SI Hardware Management System

## Base URL
`http://localhost:3000`

## Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Role-based Access Control
- `ADM` (Admin): Full access to all endpoints
- `AST` (Assistant): Limited access to specific endpoints

---

## User Endpoints

### Register User
- **POST** `/auth/register`
- **Auth Required**: No
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "email": "string (unikom email)",
    "nama": "string (max 30 chars, letters only)",
    "nim": "string (8 digits)",
    "password": "string (min 8 chars, 1 uppercase, 1 number)"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully.",
    "data": {
      "idUser": "string",
      "idRole": "string",
      "email": "string",
      "nama": "string",
      "nim": "string",
      "isActive": "boolean"
    }
  }
  ```

### Login User
- **POST** `/auth/login`
- **Auth Required**: No
- **Description**: Authenticate user and return JWT token
- **Request Body**:
  ```json
  {
    "nim": "string (8 digits)",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login Successfully!",
    "token": "string"
  }
  ```

### Get All Users
- **GET** `/auth/getAllUser`
- **Auth Required**: Yes (Admin only)
- **Description**: Get all registered users
- **Response**:
  ```json
  {
    "message": "Successfully get all users",
    "data": [
      {
        "idUser": "string",
        "idRole": "string",
        "email": "string",
        "nama": "string",
        "nim": "string",
        "isActive": "boolean"
      }
    ]
  }
  ```

### Get User Profile
- **GET** `/auth/infoProfile`
- **Auth Required**: Yes
- **Description**: Get current user's profile information
- **Response**:
  ```json
  {
    "message": "Successfully get info account",
    "data": {
      "nim": "string",
      "nama": "string",
      "idRole": "string",
      "email": "string"
    }
  }
  ```

### Update User Status
- **PUT** `/auth/changeStatus/:idUser`
- **Auth Required**: Yes (Admin only)
- **Description**: Activate a user account
- **URL Parameters**:
  - `idUser`: User ID to activate
- **Response**:
  ```json
  {
    "message": "User <idUser> successfully updated!"
  }
  ```

### Reset User Password
- **POST** `/auth/resetPassword`
- **Auth Required**: Yes (Admin only)
- **Description**: Reset a user's password
- **Request Body**:
  ```json
  {
    "nim": "string (8 digits)",
    "newPassword": "string (min 8 chars)"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User dengan nim <nim> successfully updated!"
  }
  ```

---

## Role Endpoints

### Get User Role
- **GET** `/role/getRole`
- **Auth Required**: Yes
- **Description**: Get current user's role
- **Response**:
  ```json
  {
    "message": "Success",
    "data": "string (role)"
  }
  ```

---

## Barang (Item) Endpoints

### Get All Barang
- **GET** `/barang`
- **Auth Required**: No
- **Description**: Get all available items
- **Response**:
  ```json
  {
    "message": "Successfully get All barang!",
    "data": [
      {
        "idBarang": "string",
        "namaBarang": "string",
        "deskripsiBarang": "string"
      }
    ]
  }
  ```

### Add Barang
- **POST** `/barang/addBarang`
- **Auth Required**: Yes (Admin only)
- **Description**: Add a new item
- **Request Body**:
  ```json
  {
    "namaBarang": "string",
    "deskripsi": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Successfully created barang!",
    "data": {
      "idBarang": "string",
      "namaBarang": "string",
      "deskripsiBarang": "string"
    }
  }
  ```

### Delete Barang
- **DELETE** `/barang/deleteBarang/:id`
- **Auth Required**: Yes (Admin only)
- **Description**: Delete an item
- **URL Parameters**:
  - `id`: Barang ID to delete
- **Response**:
  ```json
  {
    "message": "Barang <id> deleted!"
  }
  ```

---

## Ruang Lab (Lab Room) Endpoints

### Get All Lab Rooms
- **GET** `/ruangLab`
- **Auth Required**: No
- **Description**: Get all available lab rooms
- **Response**:
  ```json
  {
    "message": "Successfully retrieved all data lab.",
    "data": [
      {
        "idLab": "string",
        "ruanganLab": "string"
      }
    ]
  }
  ```

### Add Lab Room
- **POST** `/ruangLab/addLab`
- **Auth Required**: Yes (Admin only)
- **Description**: Add a new lab room
- **Request Body**:
  ```json
  {
    "ruanganLab": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Successfully added ruanganLab",
    "data": {
      "idLab": "string",
      "ruanganLab": "string"
    }
  }
  ```

### Delete Lab Room
- **DELETE** `/ruangLab/deleteLab/:id`
- **Auth Required**: Yes (Admin only)
- **Description**: Delete a lab room
- **URL Parameters**:
  - `id`: Lab room ID to delete
- **Response**:
  ```json
  {
    "message": "Successfully deleted <id>."
  }
  ```

---

## Data Lab (Lab Inventory) Endpoints

### Get Lab Inventory
- **GET** `/datalab/getDataLab/:idLab`
- **Auth Required**: No
- **Description**: Get inventory for a specific lab
- **URL Parameters**:
  - `idLab`: Lab ID
- **Response**:
  ```json
  {
    "message": "Get all data successfully!",
    "data": [
      {
        "idBarang": "string",
        "jumlahNormal": "number",
        "jumlahRusak": "number",
        "jumlah": "number (available quantity)",
        "barangModel": {
          "namaBarang": "string"
        }
      }
    ]
  }
  ```

### Add Item to Lab
- **POST** `/datalab/addDataLab`
- **Auth Required**: Yes (Admin only)
- **Description**: Add an item to a lab
- **Request Body**:
  ```json
  {
    "idBarang": "string",
    "idLab": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Successfully add <idBarang> to <idLab>!",
    "data": {
      "idDataLab": "string",
      "idLab": "string",
      "idBarang": "string",
      "jumlahNormal": 0,
      "jumlahRusak": 0
    }
  }
  ```

### Update Lab Inventory
- **PUT** `/datalab/updateDataLab/:idLab`
- **Auth Required**: Yes (Admin only)
- **Description**: Update quantities for items in a lab
- **URL Parameters**:
  - `idLab`: Lab ID
- **Request Body**:
  ```json
  [
    {
      "idBarang": "string",
      "jumlahNormal": "number",
      "jumlahRusak": "number"
    }
  ]
  ```
- **Response**:
  ```json
  {
    "message": "Successfully updated data"
  }
  ```

---

## Praktikum (Activity) Endpoints

### Add Activity Type
- **POST** `/praktikum/addTipePraktikum`
- **Auth Required**: Yes (Admin only)
- **Description**: Add a new activity type
- **Request Body**:
  ```json
  {
    "namaPraktikum": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Successfully created praktikum!",
    "data": {
      "idPraktikum": "string",
      "namaPraktikum": "string"
    }
  }
  ```

### Add Activity Data
- **POST** `/praktikum/addPraktikum/:idLab/:idPraktikum`
- **Auth Required**: Yes
- **Description**: Record an activity session
- **Content-Type**: `multipart/form-data`
- **URL Parameters**:
  - `idLab`: Lab ID
  - `idPraktikum`: Activity type ID
- **Form Data**:
  ```json
  {
    "tanggal": "date",
    "idDosen": "string",
    "idKelas": "string",
    "waktu": "string",
    "tindakLanjut": "string",
    "photoPraktikum": "file (image)",
    "dataAlat": "JSON string (array of objects)"
  }
  ```
  Example for dataAlat:
  ```json
  [
    {
      "idBarang": "string",
      "jumlahAkhir": "number",
      "catatan": "string"
    }
  ]
  ```
- **Response**:
  ```json
  {
    "message": "Successfully added history",
    "history": {
      "idHistory": "string",
      "idUser": "string",
      "idPraktikum": "string",
      "idLab": "string",
      "idDosen": "string",
      "idKelas": "string",
      "tanggal": "date",
      "waktu": "string",
      "tindakLanjut": "string",
      "ttd": "string (URL to photo)"
    },
    "historyDetail": [
      {
        "idHistory": "string",
        "idDataLab": "string",
        "jumlahAwal": "number",
        "jumlahAkhir": "number",
        "jumlahRusak": "number",
        "isResolved": "boolean",
        "catatan": "string"
      }
    ]
  }
  ```

### Get Activity History
- **GET** `/praktikum/getPraktikumHistory/:idPraktikum`
- **Auth Required**: No
- **Description**: Get all activity records for a specific activity type
- **URL Parameters**:
  - `idPraktikum`: Activity type ID
- **Response**:
  ```json
  {
    "message": "Histories successfully get!",
    "data": [
      {
        "idHistory": "string",
        "idUser": "string",
        "idPraktikum": "string",
        "idLab": "string",
        "idDosen": "string",
        "idKelas": "string",
        "tanggal": "date",
        "waktu": "string",
        "tindakLanjut": "string",
        "ttd": "string (URL to photo)",
        "userModel": {
          "nama": "string"
        },
        "dosenModel": {
          "namaDosen": "string"
        },
        "kelasModel": {
          "namaKelas": "string"
        }
      }
    ]
  }
  ```

### Get Activity Detail
- **GET** `/praktikum/getDetailHistory/:idHistory`
- **Auth Required**: No
- **Description**: Get detailed information about a specific activity record
- **URL Parameters**:
  - `idHistory`: History record ID
- **Response**:
  ```json
  {
    "message": "Histories successfully get!",
    "data": [
      {
        "idHistory": "string",
        "jumlahAwal": "number",
        "jumlahAkhir": "number",
        "jumlahRusak": "number",
        "dataLabModel": {
          "idDataLab": "string",
          "barangModel": {
            "namaBarang": "string"
          }
        }
      }
    ]
  }
  ```

### Get Activities by Date Range
- **GET** `/praktikum/viewPraktikum`
- **Auth Required**: No
- **Description**: Get activities within a date range
- **Query Parameters**:
  - `idPraktikum` (optional): Activity type ID
  - `tanggalMulai`: Start date
  - `tanggalAkhir`: End date
- **Response**:
  ```json
  {
    "message": "Successfully get all praktikum by date!",
    "data": [
      {
        "idHistory": "string",
        "idUser": "string",
        "idPraktikum": "string",
        "idLab": "string",
        "idDosen": "string",
        "idKelas": "string",
        "tanggal": "date",
        "waktu": "string",
        "tindakLanjut": "string",
        "ttd": "string"
      }
    ]
  }
  ```

### Get Problem Reports
- **GET** `/praktikum/viewProblem`
- **Auth Required**: No
- **Description**: Get all unresolved equipment problems
- **Response**:
  ```json
  {
    "message": "Successfully get all report!",
    "data": [
      {
        "idHistoryDetail": "string",
        "idHistory": "string",
        "idDataLab": "string",
        "jumlahAwal": "number",
        "jumlahAkhir": "number",
        "jumlahRusak": "number",
        "isResolved": "boolean",
        "catatan": "string"
      }
    ]
  }
  ```

---

## Dosen (Lecturer) Endpoints

### Get All Lecturers
- **GET** `/dosen`
- **Auth Required**: No
- **Description**: Get all registered lecturers
- **Response**:
  ```json
  {
    "message": "Successfully get All Dosen",
    "data": [
      {
        "idDosen": "string",
        "namaDosen": "string"
      }
    ]
  }
  ```

### Add Lecturer
- **POST** `/dosen/addDosen`
- **Auth Required**: Yes (Admin only)
- **Description**: Add a new lecturer
- **Request Body**:
  ```json
  {
    "namaDosen": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Successfully created dosen",
    "data": {
      "idDosen": "string",
      "namaDosen": "string"
    }
  }
  ```

### Delete Lecturer
- **DELETE** `/dosen/deleteDosen/:idDosen`
- **Auth Required**: Yes (Admin only)
- **Description**: Delete a lecturer
- **URL Parameters**:
  - `idDosen`: Lecturer ID to delete
- **Response**:
  ```json
  {
    "message": "Successfully deleted dosen!",
    "data": "number (rows affected)"
  }
  ```

---

## Kelas (Class) Endpoints

### Get All Classes
- **GET** `/kelas`
- **Auth Required**: Yes (Admin only)
- **Description**: Get all registered classes
- **Response**:
  ```json
  {
    "message": "Successfully get All Dosen",
    "data": [
      {
        "idKelas": "string",
        "namaKelas": "string"
      }
    ]
  }
  ```

### Add Class
- **POST** `/kelas/addKelas`
- **Auth Required**: Yes (Admin only)
- **Description**: Add a new class
- **Request Body**:
  ```json
  {
    "namaKelas": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Successfully created kelas!",
    "data": {
      "idKelas": "string",
      "namaKelas": "string"
    }
  }
  ```

### Bulk Add Classes from CSV
- **POST** `/kelas/bulkAdd`
- **Auth Required**: Yes (Admin only)
- **Description**: Add multiple classes from a CSV file
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  ```json
  {
    "file": "CSV file with namaKelas column"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Import data selesai diproses.",
    "total": "number",
    "ok": "number",
    "fail": "number",
    "errors": [
      {
        "line": "number",
        "name": "string",
        "message": "string",
        "error": "string"
      }
    ]
  }
  ```

### Delete Class
- **DELETE** `/kelas/deleteKelas/:idKelas`
- **Auth Required**: Yes (Admin only)
- **Description**: Delete a class
- **URL Parameters**:
  - `idKelas`: Class ID to delete
- **Response**:
  ```json
  {
    "message": "Successfully deleted dosen!",
    "data": "number (rows affected)"
  }
  ```

---

## Kelas Dosen (Lecturer-Class Assignment) Endpoints

### Get All Lecturer-Class Assignments
- **GET** `/dosenKelas`
- **Auth Required**: Yes (Admin only)
- **Description**: Get all lecturer-class assignments
- **Response**:
  ```json
  {
    "message": "Get all data kelas successfully!",
    "data": [
      {
        "idKelasDosen": "string",
        "idDosen": "string",
        "idKelas": "string",
        "tahunAjar": "number",
        "tahunSelesai": "number",
        "semester": "string"
      }
    ]
  }
  ```

### Get Classes for a Lecturer
- **GET** `/dosenKelas/getKelas`
- **Auth Required**: No
- **Description**: Get classes assigned to a specific lecturer
- **Query Parameters**:
  - `namaDosen`: Lecturer name
  - `tahunAjar`: Academic year
  - `semester`: Semester
- **Response**:
  ```json
  {
    "message": "Get kelas by dosen successfully!",
    "data": [
      {
        "idKelas": "string",
        "namaKelas": "string"
      }
    ]
  }
  ```

### Assign Lecturer to Class
- **POST** `/dosenKelas/addKelasDosen`
- **Auth Required**: Yes (Admin only)
- **Description**: Assign a lecturer to a class
- **Request Body**:
  ```json
  {
    "idDosen": "string",
    "idKelas": "string",
    "tahunAjar": "number",
    "semester": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Kelas dosen added successfully",
    "data": {
      "idDosen": "string",
      "idKelas": "string",
      "tahunAjar": "number",
      "tahunSelesai": "number",
      "semester": "string"
    }
  }
  ```

### Delete Lecturer-Class Assignment
- **DELETE** `/dosenKelas/deleteKelasDosen/:id`
- **Auth Required**: Yes (Admin only)
- **Description**: Remove a lecturer-class assignment
- **URL Parameters**:
  - `id`: Assignment ID to delete
- **Response**:
  ```json
  {
    "message": "Kelas deleted successfully",
    "data": "number (rows affected)"
  }
  ```

---

## Health Check Endpoint

### Health Check
- **GET** `/health`
- **Auth Required**: No
- **Description**: Check if the server is running
- **Response**:
  ```json
  {
    "status": "OK",
    "timestamp": "number",
    "uptime": "number"
  }
  ```

---

## Home Endpoint

### Home
- **GET** `/`
- **Auth Required**: No
- **Description**: Home page
- **Response**: `Hello World!`

---

## Error Responses

Common error responses:
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Invalid credentials
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource
- `500 Internal Server Error`: Server error