import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result); // ось так Повертає масив обєктів, без цього - строку
}


export async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}


export async function removeContact(contactId) {
  const contacts = await listContacts();
  //визиває функцію, яка повертає масив всіх контактів

  const indexContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  //містить індек контакту, який треба видалити

  if (indexContact === -1) {
    return null;
  }
  const deletedContact = contacts.splice(indexContact, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
}


export async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
