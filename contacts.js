import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const moviesPath = path.resolve("db", "contacts.json");
const updateContacts = (list) =>
  fs.writeFile("./db/contacts.json", JSON.stringify(list, null, 2));

const readFunc = async () => {
  const readC = await fs.readFile(moviesPath, "utf-8");
  return JSON.parse(readC);
};
const writeFunc = async () => {
  await fs.writeFile("./db/contacts.json");
};
const getContactById = async (contactId) => {
  const list = await readFunc();
  const res = list.find((e) => e.id === contactId);
  if (res === -1) {
    return null;
  }
  return res;
};
const removeContact = async (contactId) => {
  const list = await readFunc();
  const index = list.findIndex((e) => e.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = list.splice(index, 1);
  await updateContacts(list);
  return result || null;
};

const addContact = async (name, email, phone) => {
  const list = await readFunc();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  list.push(newContact);
  await updateContacts(list);
  return newContact;
};

export default {
  readFunc,
  writeFunc,
  getContactById,
  addContact,
  removeContact,
};
