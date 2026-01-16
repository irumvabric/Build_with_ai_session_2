const fetch = require('node-fetch'); // Need to ensure node-fetch is available or use native fetch if node 18+

// Since node version might be older or I might not have installed node-fetch, 
// I'll check if I can use native fetch (Node 18+) or if I need to use http module.
// To be safe and dependency-free for the test script (since I didn't install node-fetch), 
// I'll use the 'http' module.

const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/items',
  method: 'GET',
};

const makeRequest = (method, path, data = null) => {
  return new Promise((resolve, reject) => {
    const opts = { ...options, method, path };
    if (data) {
      opts.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      };
    }

    const req = http.request(opts, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
            resolve({ status: res.statusCode, body: body ? JSON.parse(body) : {} });
        } catch (e) {
            resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (data) {
      req.write(data);
    }
    req.end();
  });
};

async function runTests() {
  console.log('--- Starting Backend Verification ---');

  // 1. GET initial (should be empty array)
  try {
      console.log('1. Checking initial state...');
      const res1 = await makeRequest('GET', '/api/items');
      console.log('GET /api/items:', res1.status, res1.body);
      if (res1.status !== 200 || !Array.isArray(res1.body)) throw new Error('Failed GET initial');
  } catch (e) {
      console.error('Failed step 1:', e.message);
      process.exit(1);
  }

  // 2. POST item
  try {
      console.log('2. Creating item...');
      const item = JSON.stringify({ name: 'Test Item', content: 'Working!' });
      const res2 = await makeRequest('POST', '/api/items', item);
      console.log('POST /api/items:', res2.status, res2.body);
      if (res2.status !== 201 || res2.body.name !== 'Test Item') throw new Error('Failed POST');
  } catch (e) {
      console.error('Failed step 2:', e.message);
      process.exit(1);
  }

  // 3. GET verify persistence
  try {
      console.log('3. Verifying persistence...');
      const res3 = await makeRequest('GET', '/api/items');
      console.log('GET /api/items:', res3.status, res3.body);
      if (res3.status !== 200 || res3.body.length === 0) throw new Error('Failed GET persistence');
  } catch (e) {
      console.error('Failed step 3:', e.message);
      process.exit(1);
  }
  
  console.log('--- Verification Passed! ---');
}

// Wait for server to potentially start
setTimeout(runTests, 2000);
