const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Lista wszystkich kontaktów
async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

// Szukanie kontaktu po ID
async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === String(contactId));
  }
  

// Usuwanie kontaktu po ID
async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
}

// Dodawanie kontaktu
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: Date.now().toString(), // prosty unikalny ID
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
