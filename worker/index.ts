/** Cloudflare Worker entry point for the vinext-starter template. */
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const source = url.searchParams.get("url");
      const assetUrl = source ? new URL(source, url) : null;

      if (!source?.startsWith("/") || assetUrl?.origin !== url.origin) {
        return new Response("Invalid image URL", { status: 400 });
      }

      return env.ASSETS.fetch(new Request(assetUrl, request));
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
