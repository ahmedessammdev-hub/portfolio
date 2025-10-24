# Admin Dashboard Guide

## 🎯 Overview
This portfolio includes a complete admin dashboard for managing all content without editing code. Built with Next.js, Prisma, and SQLite.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data (including admin user)
npm run db:seed
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access Admin Dashboard
Navigate to: `http://localhost:3000/admin/login`

**Default Credentials:**
- Email: `admin@portfolio.com`
- Password: `admin123`

⚠️ **Important:** Change the default password immediately after first login!

## 📋 Admin Dashboard Features

### 🏠 Dashboard Home
- Overview of all sections
- Quick stats (projects count, experiences, skills, messages)
- Direct links to each management page

### 🎯 Hero Section
Manage the main landing section:
- Name and bio text
- LinkedIn and GitHub URLs
- CV/Resume link
- Hero image URL

### 👤 About Section
Update your about information:
- Title and bio
- Detailed description
- Profile image
- Contact and resume links
- CTA button texts

### 💼 Experience Management
Full CRUD interface for work experience:
- Position and company name
- Duration and location
- Job description
- Technologies used (comma-separated)
- Display order

**Features:**
- Add new experience
- Edit existing entries
- Delete entries
- Reorder with order field

### 🚀 Projects Management
Manage your portfolio projects:
- Project title and description
- Project image URL
- Live demo link
- GitHub repository link
- Featured project toggle
- Technologies (comma-separated)
- Display order

**Features:**
- Modal form for create/edit
- Featured badge display
- Technology tags
- Delete with confirmation

### ⚡ Skills Management
Two-level skill organization:
- **Categories:** Frontend, Backend, Tools, etc.
  - Category name
  - Icon (emoji or text)
  - Display order
  
- **Skills:** Individual skills within categories
  - Skill name
  - Proficiency level (0-100%) with slider
  - Display order

**Features:**
- Add/edit/delete categories
- Add/edit/delete skills within categories
- Progress bar visualization
- Cascade delete (deleting category removes all its skills)

### 🎓 Education Management
Manage educational background:
- Degree/Title
- Institution name
- Duration and location
- Description
- GPA (optional)
- Type: Degree / Certification / Online Course
- Achievements (one per line)
- Display order

**Features:**
- Type badges with color coding
- Achievement list display
- Rich form with all fields

### 📧 Contact Management
Three tabs for contact management:

**1. Contact Info Tab:**
- Section title and subtitle
- Email and phone
- Location
- Social media URLs (GitHub, LinkedIn, Twitter)

**2. Contact Methods Tab:**
- Add custom contact methods
- Icon, title, description
- Value and link
- Display order
- Edit/delete methods

**3. Submissions Tab:**
- View all contact form submissions
- Unread badge counter
- Click to view details
- Mark as read
- Reply via email button
- Message details (name, email, subject, message, date)

### ⚙️ Settings
Admin account and site management:

**Change Password:**
- Current password verification
- New password (min 6 characters)
- Password confirmation

**Site Information:**
- Framework version
- Database type
- Node version
- Environment

**Actions:**
- Clear cache
- Open Prisma Studio
- Logout

**Danger Zone:**
- Reset database
- Export database backup

## 🔐 Security Features

### Authentication
- JWT-based authentication
- HTTP-only cookies
- Secure password hashing with bcrypt
- Protected admin routes

### Middleware
All admin API routes are protected with JWT verification:
```javascript
import { requireAuth } from '@/lib/auth';

export const POST = requireAuth(async (request) => {
  // Your protected route logic
});
```

## 📡 API Routes

### Public API Routes
- `GET /api/hero` - Get hero data
- `GET /api/about` - Get about data
- `GET /api/experience` - Get all experiences
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills with categories
- `GET /api/education` - Get all education entries
- `GET /api/contact` - Get contact info and methods
- `POST /api/contact` - Submit contact form

### Admin API Routes (Protected)
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout
- `POST /api/admin/change-password` - Change password

**Hero:**
- `PUT /api/hero` - Update hero section

**About:**
- `PUT /api/about` - Update about section

**Experience:**
- `POST /api/experience` - Create experience
- `GET /api/experience/:id` - Get single experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

**Projects:**
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Skills:**
- `POST /api/skills` - Create skill category
- `GET /api/skills/:id` - Get category
- `PUT /api/skills/:id` - Update category
- `DELETE /api/skills/:id` - Delete category (cascades to skills)
- `POST /api/skills/:id/skills` - Create skill in category
- `PUT /api/skills/:id/skills/:skillId` - Update skill
- `DELETE /api/skills/:id/skills/:skillId` - Delete skill

**Education:**
- `POST /api/education` - Create education
- `GET /api/education/:id` - Get single education
- `PUT /api/education/:id` - Update education
- `DELETE /api/education/:id` - Delete education

**Contact:**
- `PUT /api/contact/info` - Update contact info
- `POST /api/contact/methods` - Create contact method
- `PUT /api/contact/methods/:id` - Update method
- `DELETE /api/contact/methods/:id` - Delete method
- `GET /api/contact/submissions` - Get all submissions
- `PUT /api/contact/submissions/:id` - Mark as read
- `DELETE /api/contact/submissions/:id` - Delete submission

## 🗄️ Database Management

### Prisma Studio
View and edit database directly:
```bash
npm run db:studio
```
Opens at: `http://localhost:5555`

### Reset Database
```bash
# Reset and reseed
npm run db:push
npm run db:seed
```

### Backup Database
The database file is located at: `prisma/dev.db`

Simply copy this file to create a backup:
```bash
# Windows
copy prisma\dev.db prisma\dev.db.backup

# Mac/Linux
cp prisma/dev.db prisma/dev.db.backup
```

## 🎨 Styling Guidelines

All admin pages follow these design patterns:

**Colors:**
- Background: `#000000` (black)
- Cards: `#111111`
- Borders: `#484848`
- Accent: `#D3E97A` (lime green)
- Text: `#FFFFFF` (white)
- Secondary text: `#C7C7C7` (gray)

**Fonts:**
- Headings: Bebas Neue
- Body: Manrope

**Components:**
- Rounded corners: `rounded-xl`
- Hover effects on all interactive elements
- Loading spinners for async operations
- Success/error message toasts
- Modal forms for create/edit operations

## 🔄 Frontend Integration

### Connecting Frontend to API
Currently, frontend components use static data. To connect them to the API:

1. Add state management:
```javascript
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
```

2. Fetch data on mount:
```javascript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/your-endpoint');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchData();
}, []);
```

3. Replace static data with fetched data in JSX

## 📝 Best Practices

### Content Management
1. **Images:** Use image URLs (upload to image hosting service)
2. **Order:** Use order field to control display sequence
3. **Featured:** Mark important projects as featured
4. **Technologies:** Comma-separated for easy input
5. **Achievements:** One per line for easy editing

### Security
1. Change default admin password immediately
2. Use strong passwords (min 6 characters)
3. Don't share admin credentials
4. Backup database regularly
5. Keep dependencies updated

### Development
1. Test changes in development first
2. Use Prisma Studio for quick DB edits
3. Check API responses in browser DevTools
4. Monitor console for errors
5. Clear browser cache if data doesn't update

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset Prisma Client
npm run db:generate

# Push schema changes
npm run db:push

# Reset and reseed
npm run db:seed
```

### Login Issues
- Check if admin exists in database (Prisma Studio)
- Verify JWT_SECRET in .env file
- Clear browser cookies
- Check console for errors

### API Errors
- Verify JWT token is being sent
- Check CORS settings
- Ensure database is running
- Check API route logs

### Styling Issues
- Clear Next.js cache: `rm -rf .next`
- Check Tailwind config
- Verify font imports
- Check browser DevTools

## 🚀 Deployment

### Environment Variables
Create `.env` file:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### Production Checklist
- [ ] Change admin password
- [ ] Update JWT_SECRET
- [ ] Setup production database (PostgreSQL recommended)
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Setup email notifications for contact form
- [ ] Add image upload functionality
- [ ] Setup automated backups
- [ ] Add monitoring and logging

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🆘 Support

For issues or questions:
1. Check console logs
2. Review API responses
3. Check database with Prisma Studio
4. Verify environment variables
5. Clear cache and restart dev server

---

Built with ❤️ using Next.js, Prisma, and SQLite
