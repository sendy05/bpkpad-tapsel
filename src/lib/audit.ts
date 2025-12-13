// Legacy audit logging - table auditLog tidak ada di database
// Function ini tidak digunakan lagi

export async function logAudit(params: {
    userId: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    entity: string;
    entityId: string;
    details?: string;
}) {
    // Audit logging disabled - table tidak ada
    // console.log('Audit log:', params);
    return;

    /* LEGACY CODE
    import { prisma } from '@/lib/db';
    const { userId, action, entity, entityId, details } = params;
    try {
        await prisma.auditLog.create({
            data: { userId, action, entity, entityId, details: details || null },
        });
    } catch {
        // swallow errors to not block main flow
    }
    */
}

