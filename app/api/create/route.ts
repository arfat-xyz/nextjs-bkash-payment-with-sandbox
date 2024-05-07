import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { bkash_auth } from "./bkash-middleware";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { amount } = z
      .object({
        amount: z.string({ required_error: "amount must be string" }),
      })
      .parse(json);
    const id_token = await bkash_auth();
    const data = await fetch(process.env.bkash_create_payment_url as string, {
      method: "POST",
      body: JSON.stringify({
        mode: "0011",
        payerReference: " ",
        callbackURL: `${process.env.bkash_base_url_for_api}/callback?id_token=${id_token}`,
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: id_token,
        "x-app-key": process.env.bkash_api_key as string,
      },
    }).then((bRes) => bRes.json());
    if (!data.bkashURL) {
      return new Response(JSON.stringify(data), {
        status: 401,
      });
    }
    return new Response(JSON.stringify({ bkashURL: data.bkashURL }), {
      status: 201,
    });
  } catch (error) {
    console.log(error, "from error");
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(null, { status: 500 });
  }
}
