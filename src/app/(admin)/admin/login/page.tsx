import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export const metadata = {
    title: 'Login Admin',
};

export const dynamic = 'force-dynamic';

export default async function Page() {
    const session = await auth();
    if (session) {
        redirect('/admin');
    }
    return <LoginForm />;
}

