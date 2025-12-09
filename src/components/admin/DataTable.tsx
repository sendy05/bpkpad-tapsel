"use client";
import * as React from 'react';

type Column<T> = {
    header: string;
    accessor: (row: T) => React.ReactNode;
    className?: string;
};

export function DataTable<T>({ columns, data }: { columns: Column<T>[]; data: T[] }) {
    return (
        <div className="overflow-x-auto border border-gray-200 rounded-md">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        {columns.map((c, i) => (
                            <th key={i} className={`text-left px-3 py-2 font-medium ${c.className || ''}`}>{c.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, r) => (
                        <tr key={r} className="border-t border-gray-100">
                            {columns.map((c, i) => (
                                <td key={i} className={`px-3 py-2 ${c.className || ''}`}>{c.accessor(row)}</td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td className="px-3 py-6 text-center text-gray-500" colSpan={columns.length}>Tidak ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
