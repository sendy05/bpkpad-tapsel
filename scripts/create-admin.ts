import { prisma } from '../src/lib/db';

async function createTestAdmin() {
    try {
        console.log('🔐 Creating test admin user...\n');

        // Check if testadmin already exists
        const existing = await prisma.admin.findFirst({
            where: { username: 'admin' }
        });

        if (existing) {
            console.log('⚠️  Admin user "admin" already exists!');
            console.log(`   Username: admin`);
            console.log(`   Status: ${existing.status}`);

            // Update to active if inactive
            if (existing.status === 0) {
                await prisma.admin.update({
                    where: { id: existing.id },
                    data: { status: 1 }
                });
                console.log('✅ Updated status to ACTIVE');
            }
            return;
        }

        // Create new admin user
        const newAdmin = await prisma.admin.create({
            data: {
                username: 'admin',
                password: 'admin123',
                nm_pengguna: 'Administrator',
                email: 'admin@bpkpad.go.id',
                level: 1, // Super Admin
                status: 1, // Active
                lock_user: 0,
                date_create: new Date(),
            }
        });

        console.log('✅ Test admin created successfully!\n');
        console.log('Login credentials:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log(`   Level: ${newAdmin.level} (Super Admin)`);
        console.log(`   Status: ${newAdmin.status} (Active)`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestAdmin();
