# TFLuau Proxy

A Cloudflare Worker that acts as a CORS-enabled proxy for TFLuau, an API wrapper for various TfL APIs in Roblox.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/guardbuzzer/TFLuauProxy)

If you do not want to deploy to Cloudflare, you can run this project using Wrangler or use my hosted version available at https://tfluau.gdbz.dev/

## Optional Authentication

The proxy supports optional secret-based authentication. When enabled, clients must provide a secret to use the proxy.

### Configuration

To enable authentication, set the `PROXY_SECRET` environment variable. You can do this in several ways:

**Option 1: Using wrangler.toml (for local development)**
```toml
[vars]
PROXY_SECRET = "your-secret-key-here"
```

**Option 2: Using Cloudflare Dashboard (recommended for production)**
1. Go to your Worker in the Cloudflare Dashboard
2. Navigate to Settings → Variables
3. Add a new environment variable:
   - Variable name: `PROXY_SECRET`
   - Value: `your-secret-key-here`

**Option 3: Using Wrangler CLI**
```bash
wrangler secret put PROXY_SECRET
```