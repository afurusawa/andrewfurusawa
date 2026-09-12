import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

const handler = makeRouteHandler({ config });

function disabled() {
  return new Response(null, { status: 404 });
}

export const GET =
  process.env.NODE_ENV === "production" ? disabled : handler.GET;
export const POST =
  process.env.NODE_ENV === "production" ? disabled : handler.POST;
