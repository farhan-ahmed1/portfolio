import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Save to database
    const message = await prisma.message.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        body: validatedData.body,
      },
    });

    // Send email notification
    if (resend) {
      await resend.emails.send({
        from: 'Portfolio <contact@yourdomain.com>',
        to: ['your-email@example.com'],
        subject: `New contact form submission from ${validatedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.body.replace(/\n/g, '<br>')}</p>
        `,
      });
    }

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
