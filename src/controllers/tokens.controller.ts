import { RequestHandler } from "express";
import * as tokensService from "../services/tokens.service";

//Refresh all access tokens
export const refreshAllAccessTokens: RequestHandler = async (req, res, next) => {
  try {
    await tokensService.refreshAllAccessTokens();
    res.status(200).send("Access tokens refreshed");
  } catch (err) {
    next(err);
  }
};
