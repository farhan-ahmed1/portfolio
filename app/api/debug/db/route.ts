import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    const result = await prisma.$queryRaw`SELECT 1 as connected`;

    // Get a sample metric
    const sampleMetric = await prisma.metric.findFirst();

    // Check if interactions table exists
    let interactionsTableExists = true;
    let sampleInteraction = null;
    try {
      sampleInteraction = await prisma.interaction.findFirst();
    } catch (error) {
      interactionsTableExists = false;
    }

    // Check available tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    return NextResponse.json({
      status: 'connected',
      hasDatabase: !!process.env.DATABASE_URL,
      nodeEnv: process.env.NODE_ENV,
      sampleMetric,
      interactionsTableExists,
      sampleInteraction,
      availableTables: tables,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        hasDatabase: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
