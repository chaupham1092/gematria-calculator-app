// Netlify function to shorten URLs using is.gd API
// This avoids rate limiting issues when called from client-side

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const { url } = JSON.parse(event.body);

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL is required' }),
      };
    }

    // Validate URL
    try {
      new URL(url);
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid URL' }),
      };
    }

    // Call is.gd API
    const response = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
    );

    const data = await response.json();

    if (data.shorturl) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          shortUrl: data.shorturl,
          originalUrl: url
        }),
      };
    } else if (data.errormessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: data.errormessage 
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to shorten URL' 
        }),
      };
    }
  } catch (error) {
    console.error('Error shortening URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
    };
  }
};
