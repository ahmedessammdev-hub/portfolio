# Portfolio Backend & Admin Dashboard

## Quick Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed initial data
npm run db:seed
```

### 3. Environment Variables
Create `.env` file in root:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secure-jwt-secret-key-here"
NEXTAUTH_SECRET="your-nextauth-secret"
```

### 4. Start Development Server
```bash
npm run dev
```

## Access Points

- **Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## Default Admin Credentials
- **Email**: admin@portfolio.com
- **Password**: admin123

## Admin Features

### 📊 Dashboard Overview
- Statistics cards showing content counts
- Quick access to all content sections
- View live website link

### 🏠 Hero Section Management
- Edit name, bio, and personal links
- Update hero image and CV link
- Real-time preview updates

### 👨‍💻 About Section Management  
- Update about title and descriptions
- Manage profile image and contact links
- Edit call-to-action buttons

### 💼 Experience Management
- Add/edit/delete work experiences
- Manage technologies for each role
- Reorder experiences with drag & drop

### 🚀 Projects Management
- Create and manage portfolio projects
- Set featured projects
- Upload project images
- Add live demo and GitHub links
- Tag projects with technologies

### ⚡ Skills Management
- Organize skills by categories
- Set proficiency levels (0-100%)
- Add category icons and descriptions
- Reorder skills within categories

### 🎓 Education Management
- Add degrees, certifications, bootcamps
- Manage achievements and GPA
- Upload certificates and documents
- Track online courses

### 📬 Contact Management
- Update contact information
- Manage contact methods
- View and respond to form submissions
- Export contact data

## API Endpoints

### Public APIs
- `GET /api/hero` - Get hero section data
- `GET /api/about` - Get about section data  
- `GET /api/experience` - Get all experiences
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills by category
- `GET /api/education` - Get education history
- `GET /api/contact` - Get contact information
- `POST /api/contact` - Submit contact form

### Admin APIs (Require Authentication)
- `PUT /api/hero` - Update hero section
- `PUT /api/about` - Update about section
- `POST /api/experience` - Create experience
- `PUT /api/experience/[id]` - Update experience
- `DELETE /api/experience/[id]` - Delete experience
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project  
- `DELETE /api/projects/[id]` - Delete project

### Authentication
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout

## Database Management

### View Database (Prisma Studio)
```bash
npm run db:studio
```

### Reset Database
```bash
# Delete database file
rm prisma/dev.db

# Recreate and seed
npm run db:push
npm run db:seed
```

### Backup Database
```bash
# Copy database file
cp prisma/dev.db prisma/backup_$(date +%Y%m%d).db
```

## Production Deployment

### 1. Build Project
```bash
npm run build
```

### 2. Environment Variables
Update `.env` with production values:
```
DATABASE_URL="file:./prod.db"
JWT_SECRET="your-production-jwt-secret"
NEXTAUTH_SECRET="your-production-nextauth-secret"
```

### 3. Deploy Database
```bash
npm run db:push
npm run db:seed
```

### 4. Start Production Server
```bash
npm start
```

## Security Features

- ✅ JWT-based admin authentication
- ✅ HTTP-only cookies for session management  
- ✅ Protected admin routes
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Rate limiting ready

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT + HTTP-only cookies
- **Styling**: Tailwind CSS with custom design system
- **Fonts**: Google Fonts (Bebas Neue, Manrope, Inter)

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify database connection
3. Ensure all environment variables are set
4. Check API endpoints in browser network tab
5. Review server logs for detailed error messages

Happy coding! 🚀