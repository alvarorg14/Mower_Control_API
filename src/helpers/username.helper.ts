import * as employeesRepository from "../repositories/employees.repository";

export const generateUsername = async (name: string, surname1: string, surname2: string): Promise<string> => {
  let username = name.toLowerCase() + surname1.toLowerCase().charAt(0);

  try {
    await employeesRepository.getByUsername(username);
    if (surname2 === null || surname2 === undefined || surname2.trim() === "") {
      let i = 1;
      username = username + i;
      while (await employeesRepository.getByUsername(username)) {
        i++;
        username = username.slice(0, -1) + i;
      }
    }
    username = username + surname2.toLowerCase().charAt(0);
    await employeesRepository.getByUsername(username);
    return username;
  } catch (err) {
    return username;
  }
};

export const reformatName = (name: string, surname1: string, surname2: string) => {
  return (
    name.charAt(0).toUpperCase() +
    name.slice(1).toLowerCase() +
    " " +
    surname1.charAt(0).toUpperCase() +
    surname1.slice(1).toLowerCase() +
    " " +
    surname2.charAt(0).toUpperCase() +
    surname2.slice(1).toLowerCase()
  );
};
