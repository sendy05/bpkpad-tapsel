import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all sliders
export async function GET() {
    try {
        const sliders = await prisma.tbl_slider.findMany({
            orderBy: { tgl_update: "desc" },
        });
        return NextResponse.json(sliders);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// CREATE new slider
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const newSlider = await prisma.tbl_slider.create({
            data: {
                keterangan: body.keterangan,
                foto: body.foto,
                user: body.user || "admin",
                tgl_update: new Date(),
            },
        });

        return NextResponse.json(newSlider, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create slider" }, { status: 500 });
    }
}
