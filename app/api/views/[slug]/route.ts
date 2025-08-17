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

    // Rate limiting: Only allow 1 view per IP per project per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    const recentView = await prisma.interaction.findFirst({
      where: {
        ip: userIP,
        slug,
        type: 'VIEW',
        createdAt: {
          gt: oneHourAgo
        }
      }
    });

    if (recentView) {
      // User has viewed this project recently, don't count again
      const metric = await prisma.metric.findUnique({ where: { slug } });
      return NextResponse.json({ 
        views: metric?.views || 0,
        rateLimited: true 
      });
    }

    // Create the interaction record and update metric in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Record the interaction
      await tx.interaction.create({
        data: {
          ip: userIP,
          slug,
          type: 'VIEW'
        }
      });

      // Update the metric
      const metric = await tx.metric.upsert({
        where: { slug },
        update: { views: { increment: 1 } },
        create: { slug, views: 1, likes: 0 },
      });

      return metric;
    });

    return NextResponse.json({ 
      views: result.views,
      rateLimited: false 
    });
  } catch (error) {
    console.error('Views API error:', error);
    return NextResponse.json({ error: 'Failed to update views' }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const metric = await prisma.metric.findUnique({
      where: { slug },
    });

    return NextResponse.json({
      views: metric?.views || 0,
      likes: metric?.likes || 0,
    });
  } catch (error) {
    console.error('Views GET API error:', error);
    return NextResponse.json({ error: 'Failed to get views' }, { status: 500 });
  }
}
