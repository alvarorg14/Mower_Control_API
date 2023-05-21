const crypto = require("crypto");

export const generatePassword = (): string => {
  let password = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let passwordLength = 8;

  //Using crypto
  let bytes = crypto.randomBytes(passwordLength);
  let charsLength = characters.length;
  for (let i = 0; i < passwordLength; i++) {
    password += characters[bytes[i] % charsLength];
  }

  // Check if all conditions are satisfied
  if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g)) {
    console.log(password);
    return password;
  } else {
    // If not, recursively generate a new password
    return generatePassword();
  }
};
