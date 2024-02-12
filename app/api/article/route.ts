import { connectToDB } from '@/db';


export async function GET(request: Request) {
    await connectToDB();
}

export async function POST(request: Request) {
    await connectToDB();

}

export async function PATCH(request: Request) {
    await connectToDB();

}

export async function DELETE(request: Request) {
    await connectToDB();

}