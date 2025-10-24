# 🚀 Ahmed Essam Ahmed - Full Stack Developer Portfolio

A modern, dynamic portfolio website built with Next.js, React, and Prisma ORM. It includes an admin dashboard for managing content and a responsive frontend.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge\&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge\&logo=tailwind-css)

## ✨ Features

### Frontend

* **Modern UI/UX** with smooth animations
* **Fully Responsive** for all devices
* **Dynamic Content** via API endpoints
* **Sections:** Hero, About, Experience, Projects, Skills, Education, Contact

### Admin Dashboard

* **Secure Authentication**
* **Full CRUD Operations**
* **File Upload Support**
* **Password Management**
* **Contact Form Submissions**

## 🛠️ Tech Stack

* **Next.js** – Framework
* **React** – UI Library
* **TailwindCSS** – Styling
* **Prisma ORM** – Database Toolkit
* **JWT & bcryptjs** – Authentication

## 📦 Setup

```bash
git clone <repo-url>
cd portfolio
pnpm install
```

Create `.env` file:

```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-secret-key"
```

Then:

```bash
npx prisma generate
npx prisma db push
pnpm dev
```

## 📝 API Overview

* `GET /api/hero`
* `GET /api/about`
* `GET /api/projects`
* `POST /api/contact`

(Admin routes require authentication)

## 🔒 Security

* JWT-based authentication
* Hashed passwords
* Input validation
* Protected admin routes

## 🚀 Deployment

Deploy easily with **Vercel** or any Node.js hosting provider.

## 👤 Author

**Ahmed Essam Ahmed**
[LinkedIn](https://www.linkedin.com/in/ahmed-essam-630a33253/) | [GitHub](https://github.com/ahmedessam3270)

---

⭐ **Give a star if you like this project!**
