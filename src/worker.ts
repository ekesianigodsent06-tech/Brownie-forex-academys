export default {
  async fetch(request: Request, env: { ASSETS: { fetch: (req: Request) => Promise<Response> } }): Promise<Response> {
    // Serve static assets from dist (HTML, JS, CSS, images) with SPA routing
    return env.ASSETS.fetch(request);
  },
};
