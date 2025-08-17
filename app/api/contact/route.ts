import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = contactSchema.parse(body);

    // Save to database
    const message = await prisma.message.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        body: validatedData.body,
      },
    });

    return NextResponse.json(
      { message: 'Message sent successfully', id: message.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
