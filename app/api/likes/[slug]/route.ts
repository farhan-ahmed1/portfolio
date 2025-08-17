import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get user IP address
    const userIP =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      'unknown';

    // Check if this IP has already liked this project
    const existingLike = await prisma.interaction.findUnique({
      where: {
        ip_slug_type: {
          ip: userIP,
          slug,
          type: 'LIKE',
        },
      },
    });

    if (existingLike) {
      // User has already liked this project
      const metric = await prisma.metric.findUnique({ where: { slug } });
      return NextResponse.json(
        {
          likes: metric?.likes || 0,
          alreadyLiked: true,
          message: 'You have already liked this project',
        },
        { status: 200 }
      );
    }

    // Create the interaction record and update metric in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Record the interaction
      await tx.interaction.create({
        data: {
          ip: userIP,
          slug,
          type: 'LIKE',
        },
      });

      // Update the metric
      const metric = await tx.metric.upsert({
        where: { slug },
        update: { likes: { increment: 1 } },
        create: { slug, views: 0, likes: 1 },
      });

      return metric;
    });

    return NextResponse.json({
      likes: result.likes,
      alreadyLiked: false,
    });
  } catch (error) {
    console.error('Likes API error:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    // Get user IP address
    const userIP =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      'unknown';

    // Check if user has already liked
    const existingLike = await prisma.interaction.findUnique({
      where: {
        ip_slug_type: {
          ip: userIP,
          slug,
          type: 'LIKE',
        },
      },
    });

    // Get metric data
    const metric = await prisma.metric.findUnique({ where: { slug } });

    return NextResponse.json({
      likes: metric?.likes || 0,
      alreadyLiked: !!existingLike,
    });
  } catch (error) {
    console.error('Likes GET API error:', error);
    return NextResponse.json({ error: 'Failed to get likes' }, { status: 500 });
  }
}
