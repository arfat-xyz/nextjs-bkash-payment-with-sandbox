import { z } from "zod";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { paymentID, id_token } = z
      .object({
        paymentID: z.string(),
        id_token: z.string(),
      })
      .parse(json);
    const data = await fetch(process.env.bkash_execute_payment_url as string, {
      method: "POST",
      body: JSON.stringify({
        paymentID: paymentID as string,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: id_token,
        "x-app-key": process.env.bkash_api_key as string,
      },
    })
      .then((bRes) => {
        return bRes.json();
      })
      .catch((e) => console.log(e, "Error from api"));
    if (data && data.statusCode === "0000") {
      return new Response(JSON.stringify({ success: true }), { status: 201 });
      // return (window.location.href = `${
      //   process.env.bkash_base_url
      // }/dashboard?success=${true}`);
    } else {
      return new Response(JSON.stringify({ success: false }), { status: 201 });
      // return (window.location.href = `${
      //   process.env.bkash_base_url
      // }/dashboard?success=${false}`);
    }
  } catch (error) {
    console.log((error as any).message, "from error");

    return new Response(null, { status: 500 });
  }
}
