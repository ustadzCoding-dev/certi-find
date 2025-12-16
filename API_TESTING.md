# API Testing Guide - CertiFind

Base URL: `http://localhost:5000/api`

## 1. Auth Endpoints

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "interestField": "IT"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "interestField": "IT"
    }
  }
}
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User Profile
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Profile
```bash
curl -X PUT http://localhost:5000/api/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Jane Doe",
    "interestField": "Data Science"
  }'
```

## 2. Certification Endpoints

### Get All Certifications
```bash
curl -X GET "http://localhost:5000/api/certifications?page=1&limit=12&category=IT&level=Beginner"
```

### Get Single Certification
```bash
curl -X GET http://localhost:5000/api/certifications/1
```

### Get Certifications by Category
```bash
curl -X GET "http://localhost:5000/api/certifications/category/IT?page=1&limit=12"
```

### Create Certification (Admin Only)
```bash
curl -X POST http://localhost:5000/api/certifications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "title": "Python Basics",
    "provider": "Coursera",
    "category": "IT",
    "description": "Learn Python programming from scratch",
    "duration": "4 weeks",
    "level": "Beginner",
    "isFree": true,
    "url": "https://coursera.org/python-basics",
    "skills": ["Python", "Programming"],
    "certificateType": "Certificate of Completion",
    "language": "English"
  }'
```

### Update Certification (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/certifications/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "title": "Advanced Python",
    "level": "Intermediate"
  }'
```

### Delete Certification (Admin Only)
```bash
curl -X DELETE http://localhost:5000/api/certifications/1 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

## 3. Bookmark Endpoints

### Get User Bookmarks
```bash
curl -X GET http://localhost:5000/api/bookmarks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Add Bookmark
```bash
curl -X POST http://localhost:5000/api/bookmarks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Remove Bookmark
```bash
curl -X DELETE http://localhost:5000/api/bookmarks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Check if Bookmarked
```bash
curl -X GET http://localhost:5000/api/bookmarks/check/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 4. Admin Endpoints

### Get Dashboard Statistics
```bash
curl -X GET http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Get All Users
```bash
curl -X GET "http://localhost:5000/api/admin/users?page=1&limit=10&search=john&role=user" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Block/Unblock User
```bash
curl -X PUT http://localhost:5000/api/admin/users/1/block \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Change User Role
```bash
curl -X PUT http://localhost:5000/api/admin/users/1/role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "role": "admin"
  }'
```

## 5. Health Check

### Check API Status
```bash
curl -X GET http://localhost:5000/api/health
```

## Testing Steps

1. **Register a new user** - Get a token
2. **Login** - Verify token works
3. **Get certifications** - View available certifications
4. **Add bookmark** - Bookmark a certification
5. **Get bookmarks** - View your bookmarks
6. **Update profile** - Change user info
7. **Admin endpoints** - Test admin features (if you have admin token)

## Notes

- Replace `YOUR_TOKEN_HERE` dengan token yang Anda dapatkan dari register/login
- Replace `ADMIN_TOKEN_HERE` dengan token dari user dengan role admin
- Database menggunakan SQLite, file `certifind.db` akan dibuat otomatis
- Semua data disimpan lokal di file SQLite
