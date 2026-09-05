const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const config = require('./config.js');
const { jwtSecret: JWT_SECRET, isDev: dev, port } = config;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    path: '/socket.io',
    cors: { origin: dev ? '*' : false },
  });

  globalThis.io = io;

  io.use(async (socket, nextFn) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token || token === 'null') {
        return nextFn(new Error('Unauthorized'));
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const { connectDB } = await import('./lib/db.js');
      const User = (await import('./lib/models/User.js')).default;

      await connectDB();
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return nextFn(new Error('User not found'));
      }

      socket.userId = user._id.toString();
      socket.join(`user:${socket.userId}`);
      nextFn();
    } catch {
      nextFn(new Error('Unauthorized'));
    }
  });

  io.on('connection', () => {});

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
