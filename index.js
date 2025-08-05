addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    const url = new URL(request.url)

    const tflApiBase = 'https://api.tfl.gov.uk'
    const tflUrl = new URL(url.pathname + url.search, tflApiBase)

    const modifiedHeaders = new Headers()

    for (const [key, value] of request.headers.entries()) {
      const modifiedKey = key.replace(/_/g, '-')
      modifiedHeaders.set(modifiedKey, value)
    }

    const proxiedRequest = new Request(tflUrl.toString(), {
      method: request.method,
      headers: modifiedHeaders,
      body:
        request.method !== 'GET' && request.method !== 'HEAD'
          ? request.body
          : null,
    })

    const response = await fetch(proxiedRequest)

    const responseHeaders = new Headers()

    for (const [key, value] of response.headers.entries()) {
      const modifiedKey = key.replace(/_/g, '-')
      responseHeaders.set(modifiedKey, value)
    }

    responseHeaders.set('Access-Control-Allow-Origin', '*')
    responseHeaders.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    )
    responseHeaders.set('Access-Control-Allow-Headers', '*')

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: responseHeaders,
      })
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    })
  } catch (error) {
    return new Response(`Proxy Error: ${error.message}`, {
      status: 500,
      headers: { 'content-type': 'text/plain' },
    })
  }
}
