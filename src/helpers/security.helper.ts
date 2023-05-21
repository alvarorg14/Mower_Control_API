import ForbiddenError from "../errors/forbidden.error";
import UnauthorizedError from "../errors/unauthorized.error";

export const checkCompany = async (reqCompanyId: string, companyId: string | undefined) => {
  if (!companyId) {
    throw new UnauthorizedError("No company provided in token");
  }
  if (reqCompanyId !== companyId) {
    throw new ForbiddenError("You are not allowed to modify this company");
  }
};
