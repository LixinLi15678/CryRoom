const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer({});

// Define backend servers
const servers = [
    { target: 'http://127.0.0.1:5000/' }, // Backend server 1
    { target: 'http://127.0.0.1:5000/' }  // Backend server 2
];

// Load balancing logic (Round Robin)
let currentServerIndex = 0;

// Route incoming requests to backend servers
app.all('*', (req, res) => {
    const { method, url, headers, body } = req;

    // Select backend server based on load balancing algorithm
    const server = servers[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % servers.length;

    // Forward the request to the selected backend server
    proxy.web(req, res, { target: server.target }, (err) => {
        console.error('Error proxying request:', err);
        res.status(500).send('Proxy error');
    });
});

// Start the load balancer server
const port = 3000;
app.listen(port, () => {
    console.log(`Load balancer server listening on port ${port}`);
});
