export default {
    async fetch(req: Request): Promise<Response> {
        const { searchParams } = new URL(req.url);
        const target = searchParams.get("url");

        if (!target) {
            return new Response(JSON.stringify({ error: "Missing ?url= param" }), {
                status: 400,
                headers: getHeaders()
            });
        }

        try {
            const url = new URL(target);
            if (!["http:", "https:"].includes(url.protocol)) {
                return new Response(
                    JSON.stringify({ error: "Invalid protocol" }),
                    { status: 400, headers: getHeaders() }
                );
            }

            const res = await fetch(target, {
                headers: { "User-Agent": "Mozilla/5.0" },
            });
            const html = await res.text();

            const metadata: Record<string, string> = {};

            const regex = /<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]+)"\s*\/?>/gi;
            let match: RegExpExecArray | null;
            while ((match = regex.exec(html)) !== null) {
                metadata[match[1]] = match[2];
            }

            return new Response(JSON.stringify(metadata, null, 2), {
                headers: getHeaders()
            });
        } catch (e) {
            return new Response(
                JSON.stringify({ error: "Failed to fetch target site", details: e }),
                { status: 500, headers: getHeaders() }
            );
        }
    },
};

function getHeaders() {
    return {
        "Content-Type": "application/json",
        // IMPORTANT: This line have to be commented when deploy a new version
        // This is only for local testing (npx wrangler dev)
        //"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Origin": "https://link-inspector.pages.dev/",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
}
