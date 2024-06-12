import { headers } from "next/headers";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

async function validateRequest(request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };

  const wh = new Webhook(webhookSecret);

  return wh.verify(payloadString, svixHeaders);
}

export async function POST(request) {
  try {
    const payload = await validateRequest(request);
    console.log(payload);

    // process the event

    // everything went well
    return Response.json({ message: "Received" });
  } catch (e) {
    // something went wrong
    // no changes were made to the database
    return Response.error();
  }
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}
