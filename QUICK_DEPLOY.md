# ⚡ الخطوات السريعة للنشر

## 1️⃣ تحديث قاعدة البيانات

```bash
pnpm db:generate
pnpm db:push
pnpm db:seed
```

## 2️⃣ رفع على GitHub

```bash
git add .
git commit -m "Ready for production"
git push
```

## 3️⃣ متغيرات البيئة في Vercel

أضف المتغيرات دي في Vercel Dashboard:

```env
DATABASE_URL=postgresql://neondb_owner:npg_XbHiksdwAZ70@ep-autumn-queen-ahlsuwkz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require

JWT_SECRET=generate-random-secret-here

NEXTAUTH_URL=https://your-site.vercel.app

NEXTAUTH_SECRET=generate-random-secret-here
```

## 4️⃣ Deploy! 🚀

Vercel هيعمل automatic deployment!

---

**🔐 بيانات الدخول الافتراضية:**
- Username: `admin`
- Password: `admin123`

**⚠️ غيّرها فوراً من Settings!**
