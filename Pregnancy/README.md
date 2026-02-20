# 🤰 Pregnancy Management System

A full-featured web application built with **Django** to support pregnant women by connecting them with doctors, shops, and health resources — all in one platform.

---

## 🌟 Features

### 👤 User Module
- User registration and login
- Book and manage doctor appointments
- Browse nearby shops and their products
- Add products to cart and manage quantities
- ATM-style payment flow
- View order history
- Browse events posted by shops

### 🏥 Doctor Module
- Doctor registration and login
- View patient appointments
- Manage appointment status

### 🛒 Shop Module
- Shop registration with admin approval workflow
- Add and manage products (with image upload)
- Add and manage events
- View and update order statuses (Pending → Shipped → Delivered)
- Stock management with auto-deduction on payment

### 🛡️ Admin Module
- View all registered shops
- Approve or reject shop registrations
- Block / unblock shops
- Manage doctors and users

---

## 🛠️ Tech Stack

| Layer       | Technology              |
|-------------|-------------------------|
| Backend     | Python 3.11, Django 5.2 |
| Database    | SQLite3                 |
| Frontend    | HTML5, CSS3, Bootstrap 5 |
| UI Icons    | Font Awesome            |
| Auth        | Django session-based auth |
| Media       | Django FileField (local storage) |

---

## 📁 Project Structure

```
Pregnancy/
├── app/
│   ├── models.py          # All models (UserReg, DoctorReg, ShopReg, Product, Cart, Order, ...)
│   ├── views.py           # All view functions
│   ├── admin.py           # Django admin registrations
│   └── migrations/        # Database migrations
├── Templates/
│   ├── ADMIN/             # Admin dashboard templates
│   ├── DOCTOR/            # Doctor portal templates
│   ├── SHOP/              # Shop portal templates
│   ├── USER/              # User-facing templates
│   ├── index.html         # Landing page
│   ├── login.html         # Login page
│   ├── user_reg.html      # User registration
│   ├── doctor_reg.html    # Doctor registration
│   └── shop_reg.html      # Shop registration
├── Pregnancy/
│   ├── settings.py        # Django settings
│   └── urls.py            # URL routing
├── static/                # CSS, JS, fonts, images
├── media/                 # Uploaded product images
└── manage.py
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VishnuSuresh0204/Pregnancy-Management.git
   cd Pregnancy-Management/Pregnancy
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv env
   # Windows
   env\Scripts\activate
   # macOS/Linux
   source env/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install django pillow
   ```

4. **Apply migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (for admin access)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**
   ```bash
   python manage.py runserver
   ```

7. **Open in browser**
   ```
   http://127.0.0.1:8000/
   ```

---

## 🔗 URL Routes

| URL | Description |
|-----|-------------|
| `/` | Landing page |
| `/userReg/` | User registration |
| `/doctorReg/` | Doctor registration |
| `/shopReg/` | Shop registration |
| `/login/` | Login page |
| `/userHome/` | User dashboard |
| `/viewAppointments/` | User's appointments |
| `/viewShops/` | Browse all approved shops |
| `/viewShopProducts/?id=<id>` | View products in a shop |
| `/viewCart/` | User's shopping cart |
| `/checkout/` | Checkout / payment page |
| `/processPayment/` | Process payment |
| `/userOrders/` | User's order history |
| `/userViewEvents/` | Browse shop events |
| `/shopHome/` | Shop dashboard |
| `/shopProducts/` | Shop's product management |
| `/shopOrders/` | Shop's order management |
| `/adminHome/` | Admin dashboard |

---

## 🔐 User Roles

| Role | Access |
|------|--------|
| **Admin** | Full system access via `/adminHome/` |
| **Doctor** | Doctor portal at `/doctorHome/` |
| **Shop** | Shop portal at `/shopHome/` (requires admin approval) |
| **User** | User portal at `/userHome/` |

---

## 📸 Media

Product images are uploaded to the `media/` directory. Ensure `MEDIA_ROOT` and `MEDIA_URL` are properly configured in `settings.py` (already set).

---

## 📝 License

This project is developed for educational purposes.
