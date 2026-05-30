import { expect, test, type APIRequestContext } from '@playwright/test';

type ManifestIcon = {
  src?: string;
  sizes?: string;
  type?: string;
  purpose?: string;
};

type ManifestShortcut = {
  icons?: ManifestIcon[];
};

type WebManifest = {
  icons?: ManifestIcon[];
  shortcuts?: ManifestShortcut[];
};

async function expectAssetOk(request: APIRequestContext, path: string) {
  const response = await request.get(path);
  expect(response.status(), `${path} status`).toBe(200);
  expect(Number(response.headers()['content-length'] || 1), `${path} content-length`).toBeGreaterThan(0);
}

test.describe('Static app assets', () => {
  test('manifest icons and favicon resolve without 404', async ({ request }) => {
    const manifestResponse = await request.get('/manifest.json');
    expect(manifestResponse.status()).toBe(200);

    const manifest = (await manifestResponse.json()) as WebManifest;
    const iconPaths = new Set<string>(['/favicon.ico', '/icons/icon.svg']);

    for (const icon of manifest.icons ?? []) {
      if (icon.src?.startsWith('/')) iconPaths.add(icon.src);
    }

    for (const shortcut of manifest.shortcuts ?? []) {
      for (const icon of shortcut.icons ?? []) {
        if (icon.src?.startsWith('/')) iconPaths.add(icon.src);
      }
    }

    for (const path of iconPaths) {
      await expectAssetOk(request, path);
    }
  });

  test('service workers reference existing icon assets', async ({ request }) => {
    for (const path of ['/service-worker.js', '/sw.js']) {
      const response = await request.get(path);
      expect(response.status(), `${path} status`).toBe(200);

      const body = await response.text();
      expect(body).not.toContain('/icons/icon-192.png');
      expect(body).not.toContain('/icons/icon-512.png');
      expect(body).not.toContain('/icons/badge-72.png');
    }
  });
});
