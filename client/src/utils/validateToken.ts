import jwt_decode from "jwt-decode";

export const validateToken = (token: string) => {
  let decoded;

  try {
    decoded = jwt_decode(token);
  } catch (error) {
    return;
  }

  return decoded;
};
