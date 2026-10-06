export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response('Missing url parameter', { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/calendar,text/plain',
      }
    });

    if (!response.ok) {
      return new Response(`Error fetching calendar: ${response.status}`, { status: response.status });
    }

    const body = await response.text();

    return new Response(body, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/calendar; charset=utf-8',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (err) {
    return new Response(`Internal Error: ${err.message}`, { status: 500 });
  }
}