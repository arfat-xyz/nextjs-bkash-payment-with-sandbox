export const bkash_auth = async () => {
  try {
    const data = await fetch(process.env.bkash_grant_token_url as string, {
      method: "POST",
      body: JSON.stringify({
        app_key: process.env.bkash_api_key,
        app_secret: process.env.bkash_secret_key,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        username: process.env.bkash_username as string,
        password: process.env.bkash_password as string,
      },
    }).then((res) => res.json());

    return data.id_token;
  } catch (error) {
    return new Response((error as any).message || "You're not authorized", {
      status: 401,
    });
  }
};
