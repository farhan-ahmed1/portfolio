import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            color: '#e2e8f0',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '900px',
              textAlign: 'center',
              padding: '0 48px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Farhan Ahmed
            </h1>
            <p
              style={{
                fontSize: '32px',
                fontWeight: '500',
                color: '#94a3b8',
                marginBottom: '16px',
              }}
            >
              Software Engineer & Computer Science Student
            </p>
            <p
              style={{
                fontSize: '24px',
                color: '#64748b',
                maxWidth: '700px',
              }}
            >
              React • TypeScript • AWS • Next.js
            </p>
            <div
              style={{
                position: 'absolute',
                bottom: '48px',
                right: '48px',
                fontSize: '20px',
                color: '#475569',
              }}
            >
              Iowa State University
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
