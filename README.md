# HealthChartMD

**HealthChartMD** is a comprehensive healthcare web application designed to streamline the process of finding doctors, scheduling appointments, conducting video consultations, and accessing health-related content. It provides a secure and user-friendly platform for both patients and doctors to interact seamlessly.

## Features

### 1. Authentication
- Secure authentication using JSON Web Tokens (JWT) to protect user data.
- Role-based access control for doctors and patients to ensure appropriate permissions.

### 2. Find Doctor
- A powerful search functionality to help users find doctors by specialty, location, and availability.
- Real-time filtering to connect patients with the right healthcare professionals quickly.

### 3. Video Consultation
- Integrated video chat feature for remote consultations between patients and doctors.
- Backend support for session management, including the ability to start, join, and cancel consultations.

### 4. Health Blog
- A dynamic blog section where users can read and comment on health-related posts.
- Commenting functionality with real-time updates and backend moderation.

### 5. Schedule Appointment
- A scheduling system that allows patients to book appointments with doctors.
- Management of appointment slots, automated reminders, and doctor availability.

### 6. Payment Gateway Integration for Appointment Scheduling
- Razorpay integration for secure and seamless payment processing for appointment bookings.
- Ensures a smooth transaction experience within the application.

## Installation

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB
- Razorpay Account (for payment integration)

### Steps to Install

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/HealthChartMD.git
   cd HealthChartMD
