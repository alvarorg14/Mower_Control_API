export const generatePassword = (): string => {
  let password = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let passwordLength = 8;

  for (let i = 0; i < passwordLength; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Check if all conditions are satisfied
  if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g)) {
    return password;
  } else {
    // If not, recursively generate a new password
    return generatePassword();
  }
};
