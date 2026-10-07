import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PIXEL_ID = "911996161946270";

// Envia o evento "Lead" para a API de Conversões da Meta (lado servidor).
// O eventId é gerado no navegador e compartilhado com o Pixel para deduplicação.
export const sendLeadCapi = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        eventId: z.string().min(8).max(64),
        sourceUrl: z.string().max(512).optional(),
        fbp: z.string().max(128).optional(),
      })
      .parse(data)
  )
  .handler(async ({ data }) => {
    const token = process.env["META_CAPI_TOKEN"];
    if (!token) return { ok: false };

    try {
      const { getRequest } = await import("@tanstack/react-start/server");
      const req = getRequest();
      const ua = req.headers.get("user-agent") ?? undefined;
      const ip =
        (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() ||
        undefined;

      const payload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: data.eventId,
            action_source: "website",
            ...(data.sourceUrl ? { event_source_url: data.sourceUrl } : {}),
            user_data: {
              ...(ip ? { client_ip_address: ip } : {}),
              ...(ua ? { client_user_agent: ua } : {}),
              ...(data.fbp ? { fbp: data.fbp } : {}),
            },
          },
        ],
      };

      const res = await fetch(
        `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${token}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      return { ok: res.ok };
    } catch {
      return { ok: false };
    }
  });
