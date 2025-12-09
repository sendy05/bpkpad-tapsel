"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
    id: string | number;
    endpoint: string;
    itemName?: string;
    className?: string;
}

export default function DeleteButtonGeneric({
    id,
    endpoint,
    itemName = "item",
    className = ""
}: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`Yakin ingin menghapus ${itemName} ini?`)) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            router.refresh();
        } catch (error) {
            alert("Gagal menghapus. Silakan coba lagi.");
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {isDeleting ? "Menghapus..." : "Hapus"}
        </button>
    );
}
