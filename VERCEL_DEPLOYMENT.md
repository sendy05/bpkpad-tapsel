# Deployment ke Vercel

## Prerequisites

- Vercel CLI installed (`npm i -g vercel`)
- Git repository initialized
- All environment variables configured

## Environment Variables yang Diperlukan

Di Vercel Dashboard, tambahkan environment variables berikut:

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=generate-a-secure-secret-key

# JWT Configuration
JWT_SECRET=your-secure-jwt-secret
JWT_ACCESS_TTL_MIN=15
JWT_REFRESH_TTL_DAYS=7
JWT_REMEMBER_EXTRA_DAYS=23
```

## Build Optimization

Build script telah dikonfigurasi untuk:

1. Generate Prisma Client sebelum build
2. Mengoptimalkan performa produksi

```json
"build": "prisma generate && next build"
```

## Deploy Commands

### Via Vercel CLI

```bash
vercel deploy --prod
```

### Via Git Push

Setelah connect repository ke Vercel:

```bash
git push origin main
```

## Troubleshooting

### Error: Can't resolve '.prisma/client/default'

**Solusi**: Prisma Client harus di-generate sebelum build.

- Ini sudah otomatis karena build script sudah include `prisma generate`

### Database Connection Issues

**Verifikasi**:

1. DATABASE_URL valid dan accessible
2. Vercel environment variables sudah set
3. Network policies allow connection

### Build Timeout

**Solusi**:

- Increase build timeout di Vercel settings
- Pastikan database accessible untuk data fetching di build time
- Gunakan `export const dynamic = 'force-dynamic'` untuk halaman yang membutuhkan data runtime

## Database Schema

Pastikan semua migrations sudah applied:

```bash
pnpm exec prisma migrate deploy
```

## Local Testing Sebelum Deploy

```bash
# Build lokal
pnpm build

# Test production build
pnpm start
```

## Post-Deployment

1. Verify build logs di Vercel dashboard
2. Test aplikasi di production URL
3. Monitor error logs di Vercel Dashboard
4. Setup monitoring/alerting jika diperlukan
