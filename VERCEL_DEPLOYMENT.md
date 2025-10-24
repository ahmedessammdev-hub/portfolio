# 🚀 دليل نشر المشروع على Vercel

## الخطوات المطلوبة:

### 1️⃣ تحديث قاعدة البيانات على Neon

شغّل الأوامر دي في الترمنال:

```bash
# توليد Prisma Client الجديد
pnpm db:generate

# رفع الجداول على قاعدة بيانات Neon
pnpm db:push

# إضافة بيانات تجريبية (اختياري)
pnpm db:seed
```

### 2️⃣ رفع المشروع على GitHub

```bash
git init
git add .
git commit -m "Initial commit - Ready for Vercel"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 3️⃣ نشر المشروع على Vercel

1. **افتح موقع Vercel**: [vercel.com](https://vercel.com)
2. **سجل دخول** باستخدام حساب GitHub الخاص بك
3. **اضغط على "Add New Project"**
4. **اختر المشروع** من GitHub
5. **أضف متغيرات البيئة** (Environment Variables):

   ```
   DATABASE_URL=postgresql://neondb_owner:npg_XbHiksdwAZ70@ep-autumn-queen-ahlsuwkz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   NEXTAUTH_URL=https://your-project-name.vercel.app
   
   NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
   ```

   **⚠️ مهم جداً**: غيّر قيم `JWT_SECRET` و `NEXTAUTH_SECRET` لقيم عشوائية قوية!
   
   يمكنك توليدهم من هنا: [generate-secret.vercel.app](https://generate-secret.vercel.app/)

6. **اضغط Deploy** 🎉

### 4️⃣ بعد النشر

بعد ما المشروع يتنشر بنجاح:

1. **تحديث NEXTAUTH_URL**: روح على Vercel Settings → Environment Variables وحدّث `NEXTAUTH_URL` بالرابط الفعلي لموقعك

2. **تشغيل Seed (اختياري)**: لو عاوز تضيف بيانات تجريبية، شغل الأمر ده من Vercel CLI:
   ```bash
   vercel env pull .env.local
   pnpm db:seed
   ```

### 5️⃣ الدخول للوحة التحكم

- **الرابط**: `https://your-project-name.vercel.app/admin/login`
- **اسم المستخدم**: `admin`
- **كلمة المرور**: `admin123` (غيرها من Settings بعد الدخول!)

---

## 🔧 إعدادات إضافية

### تحديث قاعدة البيانات

لو عملت تغييرات في `schema.prisma`:

```bash
pnpm db:generate  # توليد Prisma Client
pnpm db:push      # تحديث قاعدة البيانات
```

ثم ارفع على GitHub وVercel هيعمل redeploy تلقائي.

### Vercel CLI (اختياري)

تقدر تستخدم Vercel CLI للنشر من الترمنال:

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel
```

---

## 📝 ملاحظات مهمة

- ✅ قاعدة البيانات متنقلة من SQLite لـ PostgreSQL (Neon)
- ✅ ملف `.env` محتوي على بيانات الاتصال
- ✅ ملف `.env.example` موجود كمثال
- ✅ ملف `.gitignore` محدّث
- ✅ ملف `vercel.json` موجود للإعدادات
- ⚠️ غيّر JWT_SECRET و NEXTAUTH_SECRET في Production!
- ⚠️ غيّر كلمة مرور الأدمن بعد الدخول أول مرة!

---

## 🆘 حل المشاكل الشائعة

### مشكلة: Database connection error

**الحل**: تأكد إن `DATABASE_URL` في Vercel Environment Variables صحيح ومحتوي على `?sslmode=require`

### مشكلة: Prisma Client not found

**الحل**: تأكد إن Build Command في Vercel فيه `prisma generate`

### مشكلة: Upload folder not working

**الحل**: استخدم Cloudinary أو AWS S3 للصور في Production، لأن Vercel Serverless ما بتحفظ ملفات.

---

تم التجهيز بنجاح! 🎉
