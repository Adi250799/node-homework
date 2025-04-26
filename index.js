const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case 'add':
      await addContact(name, email, phone);
      console.log('Contact added');
      break;

    case 'remove':
      await removeContact(id);
      console.log('Contact removed');
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
