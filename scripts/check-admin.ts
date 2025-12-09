import { prisma } from '../src/lib/db';

async function checkAdmin() {
    try {
        console.log('🔍 Checking admin table...\n');

        const admins = await prisma.admin.findMany({
            take: 10,
            select: {
                id: true,
                username: true,
                nm_pengguna: true,
                email: true,
                status: true,
                level: true,
                password: true,
            }
        });

        console.log(`Found ${admins.length} admin(s):\n`);

        admins.forEach((admin, index) => {
            console.log(`${index + 1}. ID: ${admin.id}`);
            console.log(`   Username: ${admin.username || 'N/A'}`);
            console.log(`   Name: ${admin.nm_pengguna || 'N/A'}`);
            console.log(`   Email: ${admin.email || 'N/A'}`);
            console.log(`   Status: ${admin.status} (1=Active, 0=Inactive)`);
            console.log(`   Level: ${admin.level}`);
            console.log(`   Password: ${admin.password ? '***' + admin.password.substring(admin.password.length - 3) : 'N/A'}`);
            console.log('');
        });

        if (admins.length === 0) {
            console.log('⚠️  No admin users found in the database!');
            console.log('   You need to create an admin user first.');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkAdmin();
