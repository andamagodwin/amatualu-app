import { Client, Account } from 'appwrite';


const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68321d04002597a140d0')
    


export const account = new Account(client);

export { client }; 