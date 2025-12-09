"use client";
import { useState } from 'react';

export default function DeleteButton({ resource, id, onDone }: { resource: 'news' | 'categories'; id: string; onDone?: () => void }) {
    const [loading, setLoading] = useState(false);
    const onClick = async () => {
        if (!confirm('Yakin hapus data ini?')) return;
        setLoading(true);
        const res = await fetch(`/api/admin/${resource}/${id}`, { method: 'DELETE' });
        setLoading(false);
        if (!res.ok) {
            alert('Gagal menghapus');
            return;
        }
        if (onDone) onDone();
        else window.location.reload();
    };
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
            {loading ? '⏳ Menghapus...' : '🗑️ Hapus'}
        </button>
    );
}
