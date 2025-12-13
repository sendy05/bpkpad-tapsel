import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const username = 'admin';
    const email = 'admin@bpkpad.local';
    const name = 'Super Admin';
    const password = 'Admin123!';

    // Check if admin already exists
    const existing = await prisma.admin.findFirst({
        where: {
            OR: [
                { username: username },
                { email: email }
            ]
        }
    });

    if (existing) {
        console.log('❌ Admin user already exists!');
        console.log(`   ID: ${existing.id}`);
        console.log(`   Username: ${existing.username}`);
        console.log(`   Email: ${existing.email}`);
        console.log(`   Level: ${existing.level}`);
        return;
    }

    // Create admin user
    const admin = await prisma.admin.create({
        data: {
            nm_pengguna: name,
            username: username,
            password: password, // Plain text as per schema
            email: email,
            level: 1, // 1 = SUPER_ADMIN
            status: 1, // Active
            lock_user: 0,
            date_create: new Date(),
        }
    });

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('Login credentials:');
    console.log(`   URL: http://localhost:3004/admin/login`);
    console.log(`   Username: ${username}`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('');
    console.log(`Admin ID: ${admin.id}`);
}

main()
    .catch((e) => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
