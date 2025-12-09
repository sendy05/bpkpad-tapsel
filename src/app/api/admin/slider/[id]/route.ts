import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET single slider
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const slider = await prisma.tbl_slider.findUnique({
            where: { id: parseInt(id) },
        });

        if (!slider) {
            return NextResponse.json({ error: "Slider tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json(slider);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// UPDATE slider
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();

        const updated = await prisma.tbl_slider.update({
            where: { id: parseInt(id) },
            data: {
                keterangan: body.keterangan,
                foto: body.foto,
                user: body.user || "admin",
                tgl_update: new Date(),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update slider" }, { status: 500 });
    }
}

// DELETE slider
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.tbl_slider.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete slider" }, { status: 500 });
    }
}
