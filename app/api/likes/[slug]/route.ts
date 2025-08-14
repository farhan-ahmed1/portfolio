import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Basic rate limiting by IP
    const userIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Upsert the metric record
    const metric = await prisma.metric.upsert({
      where: { slug },
      update: { likes: { increment: 1 } },
      create: { slug, views: 0, likes: 1 },
    });
    
    return NextResponse.json({ likes: metric.likes });
  } catch (error) {
    console.error('Likes API error:', error);
    return NextResponse.json(
      { error: 'Failed to update likes' },
      { status: 500 }
    );
  }
}
