'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill');
        // Suppress findDOMNode warnings
        const originalError = console.error;
        console.error = (...args: any[]) => {
            if (typeof args[0] === 'string' && args[0].includes('findDOMNode')) {
                return;
            }
            originalError.call(console, ...args);
        };
        return RQ;
    },
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-64 bg-gray-50 rounded-lg animate-pulse flex items-center justify-center">
                <span className="text-gray-400">Loading editor...</span>
            </div>
        ),
    }
);

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function QuillEditor({ value, onChange, placeholder, disabled }: QuillEditorProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Import CSS
        import('react-quill/dist/quill.snow.css');
    }, []);

    if (!mounted) {
        return (
            <div className="w-full h-64 bg-gray-50 rounded-lg animate-pulse flex items-center justify-center">
                <span className="text-gray-400">Loading editor...</span>
            </div>
        );
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'align',
        'link', 'image'
    ];

    return (
        <div suppressHydrationWarning>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder || 'Tulis konten di sini...'}
                readOnly={disabled}
                className="bg-white"
            />
        </div>
    );
}

