import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const username = 'admin';
    const email = 'admin@bpkpad.local';
    const name = 'Super Admin';
    const password = 'Admin123!';

    // Ensure admin user exists
    const existing = await prisma.user.findFirst({ where: { OR: [{ username }, { email }] } });
    if (!existing) {
        const passwordHash = await bcrypt.hash(password, 12);
        await prisma.user.create({
            data: {
                username,
                email,
                name,
                passwordHash,
                role: 'SuperAdmin',
                status: 'Active',
            },
        });
        console.log('Seed: created Super Admin user');
        console.log(`  username: ${username}`);
        console.log(`  email: ${email}`);
        console.log(`  password: ${password}`);
    } else {
        console.log('Seed: admin user already exists');
    }

    // Seed categories
    const catNames = [
        { name: 'Umum', slug: 'umum' },
        { name: 'Pengumuman', slug: 'pengumuman' },
        { name: 'Layanan', slug: 'layanan' },
    ];
    for (const c of catNames) {
        await prisma.category.upsert({
            where: { slug: c.slug },
            create: c,
            update: {},
        });
    }

    // Seed tags
    const tagNames = [
        { name: 'PAD', slug: 'pad' },
        { name: 'Pajak', slug: 'pajak' },
        { name: 'Retribusi', slug: 'retribusi' },
    ];
    for (const t of tagNames) {
        await prisma.tag.upsert({ where: { slug: t.slug }, create: t, update: {} });
    }

    // Seed one news
    const author = await prisma.user.findFirst({ where: { username } });
    const cat = await prisma.category.findFirst({ where: { slug: 'umum' } });
    if (author && cat) {
        const slug = 'contoh-berita-pertama';
        const existsNews = await prisma.news.findUnique({ where: { slug } });
        if (!existsNews) {
            await prisma.news.create({
                data: {
                    title: 'Contoh Berita Pertama',
                    slug,
                    content: '<p>Ini adalah konten contoh berita pertama.</p>',
                    excerpt: 'Ringkasan singkat berita pertama',
                    categoryId: cat.id,
                    status: 'PUBLISHED',
                    publishedAt: new Date(),
                    authorId: author.id,
                    tags: {
                        connect: [{ slug: 'pad' }],
                    },
                },
            });
            console.log('Seed: created sample News');
        }
    }

    // Seed slider
    await prisma.slider.upsert({
        where: { id: 'seed-slider-1' },
        update: {},
        create: {
            id: 'seed-slider-1',
            title: 'Selamat Datang di BPKPAD',
            description: 'Portal informasi pajak dan retribusi daerah',
            imageUrl: '/images/hero.svg',
            linkUrl: '/',
            order: 1,
            isActive: true,
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
