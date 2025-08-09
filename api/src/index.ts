import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/message", (c) => {
  return c.text("Hello Hono!");
});

app.all('*', async (c) => {
  // 尝试命中静态资源
  const assetRes = await c.env.ASSETS.fetch(c.req.raw);

  if (assetRes.status !== 404) {
    return assetRes;
  }

  // 判断是否是浏览器的页面导航请求（适用 SPA 回退）
  const url = new URL(c.req.url);
  const path = url.pathname;
  const isGet = c.req.method === "GET";
  const accept = c.req.header("Accept") || "";
  const wantsHtml = accept.includes("text/html");

  // 有扩展名的一般是静态文件，请保持 404，不做回退
  const hasExt = /\.[a-zA-Z0-9]+$/.test(path);

  if (isGet && wantsHtml && !hasExt) {
    // 回退到 index.html（保持同源）
    const indexUrl = new URL("/index.html", url.origin);
    const indexReq = new Request(indexUrl.toString(), {
      method: "GET",
      headers: c.req.raw.headers,
    });
    return c.env.ASSETS.fetch(indexReq);
  }

  // 其他情况，保留静态资源返回（404）
  return assetRes;


})

export default app;
