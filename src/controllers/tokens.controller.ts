import { RequestHandler } from "express";
import { Token } from "../models/tokens.model";
import * as tokensService from "../services/tokens.service";

//Refresh all access tokens
export const refreshAllAccessTokens: RequestHandler = async (req, res) => {
  try {
    await tokensService.refreshAllAccessTokens();
    res.status(200).send("Access tokens refreshed");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
