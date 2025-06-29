import { parse } from "node-html-parser";

export async function GET(verga) {
  console.log("[DIEGO] verga", verga);
  //console.log("[DIEGO] api", request);
  //const inputUrl = new URL(request).searchParams.get("url");
  //console.log("[DIEGO] input", request);
  //console.log("[DIEGO] xd", inputUrl);
  //
  //if (!inputUrl || !inputUrl.startsWith("http")) {
  return new Response(JSON.stringify({ error: "Invalid URL" }), {
    status: 400,
  });
  //}
  //
  //try {
  //  const res = await fetch(inputUrl);
  //  const html = await res.text();
  //  const root = parse(html);
  //
  //  const getMeta = (name: string) =>
  //    root.querySelector(`meta[name="${name}"]`)?.getAttribute("content") || "";
  //
  //  const getProperty = (property: string) =>
  //    root
  //      .querySelector(`meta[property="${property}"]`)
  //      ?.getAttribute("content") || "";
  //
  //  const getTwitter = (name: string) =>
  //    root
  //      .querySelector(`meta[name="twitter:${name}"]`)
  //      ?.getAttribute("content") || "";
  //
  //  return new Response(
  //    JSON.stringify({
  //      title: root.querySelector("title")?.text || "",
  //      description: getMeta("description"),
  //      keywords: getMeta("keywords"),
  //      robots: getMeta("robots"),
  //      canonical:
  //        root.querySelector('link[rel="canonical"]')?.getAttribute("href") ||
  //        "",
  //      og: {
  //        title: getProperty("og:title"),
  //        description: getProperty("og:description"),
  //        image: getProperty("og:image"),
  //        url: getProperty("og:url"),
  //        type: getProperty("og:type"),
  //      },
  //      twitter: {
  //        card: getTwitter("card"),
  //        title: getTwitter("title"),
  //        description: getTwitter("description"),
  //        image: getTwitter("image"),
  //      },
  //    }),
  //    {
  //      status: 200,
  //      headers: { "Content-Type": "application/json" },
  //    },
  //  );
  //} catch (err) {
  //  return new Response(JSON.stringify({ error: "Failed to fetch metadata" }), {
  //    status: 500,
  //  });
  //}
}
