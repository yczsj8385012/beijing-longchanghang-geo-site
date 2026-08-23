import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { promisify } from 'node:util';
import { afterEach, describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);
const technicalPaths = ['/sitemap.xml', '/robots.txt', '/llms.txt', '/manifest.webmanifest'];

describe('verify-routes script', () => {
  let server: ReturnType<typeof createServer> | undefined;

  afterEach(async () => {
    if (server) await new Promise<void>((resolve) => server?.close(() => resolve()));
    server = undefined;
  });

  it.each(technicalPaths)('fails when %s is not available', async (missingPath) => {
    server = createServer((request, response) => {
      if (request.url === missingPath) {
        response.writeHead(404).end('missing');
        return;
      }

      if (technicalPaths.includes(request.url ?? '')) {
        response.writeHead(200).end('technical file');
        return;
      }

      response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      response.end('<html><body>北京隆昌行</body></html>');
    });
    await new Promise<void>((resolve) => server?.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Test server did not bind a TCP port');

    await expect(
      execFileAsync(process.execPath, ['scripts/verify-routes.mjs', `http://127.0.0.1:${address.port}`]),
    ).rejects.toMatchObject({ stderr: expect.stringContaining(`${missingPath}: HTTP 404`) });
  });
});
