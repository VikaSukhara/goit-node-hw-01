import * as contactServise from './contacts.js'
import { program } from 'commander'
// import yargs from 'yargs'   // це функція


const invokeAction = async ({action, id, name, email, phone}) =>{
    switch(action) {
        case "list":
            const allContacts = await contactServise.listContacts()
            return console.table(allContacts)

        case "get":
            const contactById = await contactServise.getContactById(id)
            return console.log(contactById)

        case "remove":
            const contactRemoveById = await contactServise.removeContact(id)
            return console.log(contactRemoveById)
            
        case "add":
            const addContact = await contactServise.addContact({name, email, phone})
            return console.log(addContact)
            
         default :
         console.warn('\x1B[31m Unknown action type!')

    }
}

// invokeAction({action: "list"})
// invokeAction({action: "get", id: "qdggE76Jtbfd9eWJHrssH"})
// invokeAction({action: "add", name:"Vika", email:"sukhara@gmail.com", phone:'0734357539'})
//  invokeAction({action: "remove", id: "AeHIrLTr6JkxGE6SN-0Rw"})


program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

  program.parse() //масив перетворює на обєкт


const options = program.opts()
invokeAction(options)



// const {argv} = yargs(process.argv.slice(2))
// invokeAction(argv)