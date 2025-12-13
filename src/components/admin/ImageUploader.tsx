'use client';

import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
    uploadEndpoint?: string;
}

export default function ImageUploader({ value, onChange, disabled, uploadEndpoint = '/api/upload-image' }: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Compress and upload image
    const handleFileUpload = async (file: File) => {
        try {
            setIsUploading(true);

            // Compression options
            const options = {
                maxSizeMB: 1, // Max 1MB
                maxWidthOrHeight: 1920, // Max dimension
                useWebWorker: true,
                fileType: 'image/jpeg',
            };

            // Compress image
            const compressedFile = await imageCompression(file, options);
            
            // Create FormData
            const formData = new FormData();
            formData.append('file', compressedFile);

            // Upload to server
            const response = await fetch(uploadEndpoint, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload gagal');
            }

            const data = await response.json();
            onChange(data.url);
            alert('✅ Gambar berhasil diupload!');
        } catch (error: any) {
            console.error('Upload error:', error);
            alert('❌ Gagal upload gambar: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    // Start camera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false,
            });
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setShowCamera(true);
            }
        } catch (error: any) {
            alert('❌ Tidak bisa mengakses kamera: ' + error.message);
        }
    };

    // Stop camera
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setShowCamera(false);
    };

    // Capture photo from camera
    const capturePhoto = () => {
        if (!videoRef.current) return;

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(videoRef.current, 0, 0);
        
        canvas.toBlob(async (blob) => {
            if (!blob) return;
            
            const file = new File([blob], `camera-${Date.now()}.jpg`, {
                type: 'image/jpeg',
            });
            
            stopCamera();
            await handleFileUpload(file);
        }, 'image/jpeg', 0.9);
    };

    return (
        <div className="space-y-4">
            {/* Upload Buttons */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || disabled}
                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Pilih File
                </button>

                <button
                    type="button"
                    onClick={showCamera ? stopCamera : startCamera}
                    disabled={isUploading || disabled}
                    className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {showCamera ? 'Tutup Kamera' : 'Buka Kamera'}
                </button>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Camera Preview */}
            {showCamera && (
                <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full"
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <button
                            type="button"
                            onClick={capturePhoto}
                            disabled={isUploading}
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
                        >
                            <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                        </button>
                    </div>
                </div>
            )}

            {/* Image Preview */}
            {value && !showCamera && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        disabled={disabled}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-all"
                    >
                        Hapus
                    </button>
                </div>
            )}

            {/* Upload Status */}
            {isUploading && (
                <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-blue-700 font-medium">Mengkompress dan mengupload gambar...</span>
                </div>
            )}

            <p className="text-xs text-gray-500">
                💡 Upload file atau ambil foto langsung. Gambar akan otomatis dikompress (maks 1MB)
            </p>
        </div>
    );
}

