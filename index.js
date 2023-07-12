import functions from "./contacts.js";
import yargs from "yargs";
console.log("aboba");

const actions = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const cont = await functions.readFunc();
      return console.table(cont) || null;
    case "getByID":
      const byId = await functions.getContactById(id);
      return console.log(byId) || null;
    case "add":
      const newContact = await functions.addContact(name, email, phone);
      return console.log(newContact) || null;
    case "delete":
      const removeContact = await functions.removeContact(id);
      return console.log(removeContact) || null;
    default:
      console.log("default aboba");
  }
};
const { argv } = yargs(process.argv.slice(2));
console.log(argv);
actions(argv);
