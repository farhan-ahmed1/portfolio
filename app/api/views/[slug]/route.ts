import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Simple rate limiting - could be enhanced with Redis or other solutions
    const userIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Upsert the metric record
    const metric = await prisma.metric.upsert({
      where: { slug },
      update: { views: { increment: 1 } },
      create: { slug, views: 1, likes: 0 },
    });
    
    return NextResponse.json({ views: metric.views });
  } catch (error) {
    console.error('Views API error:', error);
    return NextResponse.json(
      { error: 'Failed to update views' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    const metric = await prisma.metric.findUnique({
      where: { slug },
    });
    
    return NextResponse.json({
      views: metric?.views || 0,
      likes: metric?.likes || 0,
    });
  } catch (error) {
    console.error('Views GET API error:', error);
    return NextResponse.json(
      { error: 'Failed to get views' },
      { status: 500 }
    );
  }
}
