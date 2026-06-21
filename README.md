# Faeze Naghavi — Portfolio (Next.js)

پورتفولیوی شخصی فائزه نقوی، ساخته‌شده با Next.js 16 (App Router) + TypeScript + Tailwind CSS، با انیمیشن GSAP و یک ویژوال سیگنیچر سه‌بعدی با Three.js در هیرو.

## اجرای پروژه روی سیستم خودتان

```bash
npm install
npm run dev
```

سپس آدرس `http://localhost:3000` را در مرورگر باز کنید.

برای ساخت نسخه نهایی (Production Build):

```bash
npm run build
npm start
```

## ساختار پروژه

```
app/
  layout.tsx        ← متادیتا، فونت‌ها (Space Grotesk / Inter / JetBrains Mono)
  page.tsx           ← چیدمان نهایی صفحه (همه بخش‌ها کنار هم)
  globals.css        ← استایل‌های پایه و توکن‌های رنگی
components/
  Hero.tsx           ← بخش معرفی + صحنه Three.js + انیمیشن ورود GSAP
  Reveal.tsx          ← انیمیشن ظاهر شدن هنگام اسکرول (GSAP ScrollTrigger)
  Nav.tsx, About.tsx, Skills.tsx, Work.tsx, Experience.tsx, Contact.tsx, Footer.tsx
  BlueprintGrid.tsx   ← پس‌زمینه گرید بلوپرینت
  PlateLabel.tsx      ← برچسب «PLATE — XX» بالای هر بخش
lib/
  data.ts             ← تمام محتوای متنی (مهارت‌ها، پروژه‌ها، تجربه) — اینجا را برای ویرایش محتوا باز کنید
```

## شخصی‌سازی محتوا

برای تغییر هر بخشی از متن (مهارت‌ها، پروژه‌ها، تجربه کاری، ایمیل)، فقط کافی است فایل `lib/data.ts` را ویرایش کنید؛ کامپوننت‌ها به‌صورت خودکار محتوای جدید را نمایش می‌دهند.

## دسترس‌پذیری و عملکرد

- `prefers-reduced-motion` رعایت شده: اگر کاربر در سیستم‌عاملش انیمیشن کم را فعال کرده باشد، چرخش سه‌بعدی و افکت‌های GSAP غیرفعال می‌شوند.
- فوکوس کیبورد (Keyboard Focus) روی تمام لینک‌ها و دکمه‌ها قابل مشاهده است.
- صحنه Three.js به‌درستی در هنگام unmount شدن کامپوننت پاک‌سازی (dispose) می‌شود تا نشتی حافظه ایجاد نکند.
