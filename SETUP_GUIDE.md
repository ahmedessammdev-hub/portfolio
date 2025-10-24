# Portfolio Project - Quick Start

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 3. Run Development
```bash
npm run dev
```

### 4. Access The Site
- **Frontend:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin/login

### 5. Login to Admin
```
Email: admin@portfolio.com
Password: admin123
```

**⚠️ Change password after first login!**

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with initial data
```

## 📖 Documentation

- **Backend & API:** See [BACKEND_README.md](./BACKEND_README.md)
- **Admin Guide:** See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

## 🎯 Features

✅ Complete portfolio website with multiple sections
✅ Full admin dashboard for content management
✅ SQLite database with Prisma ORM
✅ JWT authentication
✅ RESTful API
✅ Responsive design
✅ Modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Database:** SQLite + Prisma
- **Styling:** Tailwind CSS 4
- **Authentication:** JWT + bcrypt
- **Fonts:** Google Fonts (Bebas Neue, Manrope, Inter)

## 📂 Project Structure

```
portfolio/
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── seed.js          # Initial data
│   └── dev.db           # SQLite database
├── src/
│   ├── app/
│   │   ├── admin/       # Admin dashboard pages
│   │   ├── api/         # API routes
│   │   ├── components/  # React components
│   │   └── page.js      # Main page
│   └── lib/
│       ├── auth.js      # Authentication utilities
│       └── prisma.js    # Prisma client
├── ADMIN_GUIDE.md       # Complete admin documentation
└── BACKEND_README.md    # Backend API documentation
```

## 🎨 Admin Dashboard Sections

1. **Hero** - Landing section with name, bio, social links
2. **About** - About section with profile and description
3. **Experience** - Work history and job experiences
4. **Projects** - Portfolio projects with live links
5. **Skills** - Technical skills with categories
6. **Education** - Degrees, certifications, courses
7. **Contact** - Contact info, methods, and submissions
8. **Settings** - Password change and site settings

## 🔐 Security

- JWT-based authentication
- HTTP-only cookies
- Bcrypt password hashing
- Protected API routes
- Secure admin access

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu for mobile
- Responsive grid layouts
- Touch-friendly interface

## 🚀 Deployment

1. Update environment variables
2. Change admin password
3. Setup production database (PostgreSQL recommended)
4. Deploy to Vercel/Railway/your platform
5. Enable HTTPS

For detailed deployment guide, see [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

## 📧 Support

Check the admin guide for troubleshooting and best practices.

---

Happy coding! 🎉
