import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function testLogin() {
    try {
        // Find user
        const user = await prisma.user.findFirst({
            where: { username: 'admin' }
        });

        if (!user) {
            console.log('❌ User admin tidak ditemukan!');
            return;
        }

        console.log('✅ User ditemukan:');
        console.log('   Username:', user.username);
        console.log('   Email:', user.email);
        console.log('   Name:', user.name);
        console.log('   Role:', user.role);
        console.log('   Status:', user.status);
        console.log('   Has password hash:', !!user.passwordHash);

        // Test password
        const testPassword = 'Admin123!';
        const isValid = await bcrypt.compare(testPassword, user.passwordHash);

        console.log('\n🔐 Test password "Admin123!":');
        console.log('   Password valid:', isValid ? '✅ YA' : '❌ TIDAK');

        if (!isValid) {
            console.log('\n⚠️  Password tidak cocok! Perlu reset password.');
            console.log('   Jalankan: npx prisma db seed (setelah hapus user lama)');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testLogin();
