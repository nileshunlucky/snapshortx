import { NextResponse } from "next/server";
import connectDB from "@/configs/db";
import Snap from "@/models/snap.model";
import cloudinary from "@/configs/cloudinary";

export async function GET(req) {
    await connectDB();
    try {
        const snaps = await Snap.find({});
        return NextResponse.json({ snaps }, { status: 200 });
    } catch (error) {
        console.error("GET snaps failed:", error);
        return NextResponse.json({ error: "Failed to fetch snaps" }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        // Get form data
        const formData = await req.formData();
        const name = formData.get('name');
        const image = formData.get('image');
        const link = formData.get('link');
        const category = formData.get('category');

        // Validation
        if (!name || !image || !link || !category) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Use the API secret (if needed for security purposes, e.g., Cloudinary or other services)
        const apiSecret = process.env.NEXT_SECRET_API_KEY;
        if (!apiSecret) {
            return NextResponse.json({ error: 'API secret is missing' }, { status: 500 });
        }

        // Convert image to buffer
        const buffer = Buffer.from(await image.arrayBuffer());

        // Upload image to Cloudinary using upload_stream
        const uploadResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "snaps" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(buffer);
        });

        // Check if upload failed
        if (!uploadResponse) {
            return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
        }

        // Create snap
        const snap = await Snap.create({
            name,
            image: uploadResponse.secure_url,
            link,
            category,
        });

        return NextResponse.json({ snap }, { status: 201 });
    } catch (error) {
        console.error("POST snap creation failed:", error);
        return NextResponse.json({ error: 'Failed to create snap' }, { status: 500 });
    }
}

// DELETE API route
export async function DELETE(req) {
    const { id } = await req.json();

    try {
        const snap = await Snap.findByIdAndDelete(id);

        if (!snap) {
            return NextResponse.json({ error: 'Snap not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("DELETE snap failed:", error);
        return NextResponse.json({ error: 'Failed to delete snap' }, { status: 500 });
    }
}
