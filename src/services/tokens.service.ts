require("dotenv").config();
import * as tokensRepository from "../repositories/tokens.repository";
import { Token } from "../models/tokens.model";
const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

const clientId = process.env.HUSQVARNA_CLIENT_ID;
const oauthUrl = process.env.HUSQVARNA_OAUTH_URL;

export const refreshAllAccessTokens = async (): Promise<void> => {
  const tokens = await tokensRepository.getAll();
  tokens.forEach(async (token) => {
    const newToken = await refreshAccessToken(token);
    await tokensRepository.update(token.employeeId, newToken);
  });
};

const refreshAccessToken = async (oldToken: Token): Promise<Token> => {
  const params = new URLSearchParams();
  params.set("grant_type", "refresh_token");
  params.set("refresh_token", oldToken.refreshToken);
  params.set("client_id", clientId);

  const res = await fetch(oauthUrl, {
    method: "POST",
    body: params,
  }).then((res: any) => {
    if (!res.ok) throw new Error("Could not refresh access token");
    return res.json();
  });

  const newToken: Token = {
    employeeId: oldToken.employeeId,
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
  };

  return newToken;
};
