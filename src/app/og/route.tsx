import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Hesaplayım';
  const desc = searchParams.get('desc') || 'Türkiye\'nin hesaplama platformu';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 60%, #60a5fa 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div style={{ fontSize: '22px', opacity: 0.75, marginBottom: '20px', letterSpacing: '0.05em' }}>
          hesaplayim.com
        </div>
        <div
          style={{
            fontSize: title.length > 30 ? '52px' : '64px',
            fontWeight: 'bold',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}
        >
          {title}
        </div>
        {desc && (
          <div style={{ fontSize: '28px', opacity: 0.8, marginTop: '28px', maxWidth: '900px' }}>
            {desc}
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            width: '64px',
            height: '64px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
          }}
        >
          🧮
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
