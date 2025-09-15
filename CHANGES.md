# Database Integration Changes

## Backend Changes

### 1. Vendor Entity Updates
- Added `VendorStatus` enum with values: PENDING, APPROVED, REJECTED, SUSPENDED
- Added `status` field to Vendor entity with default value PENDING

### 2. Vendor Controller Updates
- Added `/vendors/{id}/approve` endpoint (PATCH)
- Added `/vendors/{id}/reject` endpoint (PATCH)  
- Added `/vendors/{id}/suspend` endpoint (PATCH)

### 3. Vendor Service Updates
- Added `updateVendorStatus()` method to handle status changes

### 4. Security Configuration
- Added PATCH method to allowed CORS methods

### 5. Database Configuration
- Added data initialization configuration in application.properties
- Created data.sql with sample users and vendors

## Frontend Changes

### 1. AdminUsers Page
- Replaced mock data with API calls to fetch users from database
- Updated delete functionality to call backend API
- Maintained existing UI and filtering functionality

### 2. AdminVendors Page  
- Replaced mock data with API calls to fetch vendors from database
- Updated approve/reject/suspend functionality to call backend APIs
- Maintained existing UI and filtering functionality

## API Endpoints

### Users
- GET `/users` - Fetch all users (Admin only)
- DELETE `/users/deleteUser/{id}` - Delete user (Admin only)

### Vendors
- GET `/vendors` - Fetch all vendors
- PATCH `/vendors/{id}/approve` - Approve vendor
- PATCH `/vendors/{id}/reject` - Reject vendor
- PATCH `/vendors/{id}/suspend` - Suspend vendor

## Database Schema Changes

The Vendor table now includes a `status` column with the following possible values:
- PENDING (default for new vendors)
- APPROVED (vendor can operate)
- REJECTED (vendor application denied)
- SUSPENDED (vendor temporarily disabled)

## Testing

1. Start the backend server
2. The data.sql file will automatically create sample users and vendors
3. Login as admin to access user and vendor management
4. Test the approve/reject/suspend functionality for vendors

## Admin Credentials
- Email: admin@grocery.com
- Password: password (encoded in data.sql)