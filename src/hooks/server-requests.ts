import { Message } from '../types/message';
import { mockUsers } from '../assets/mockUsers'; // todo: remove this line after server implementation

const endpoint = '../assets/'; // todo: add endpoint (server) address (starting with http://)


/**
 * GET Request to get the list of messages
 **/
export async function getMessages() {
  // todo: replace this with fetch to get the messages from the server
  // const { mockMessages } = await import(`${endpoint}/mockMessages`);

  const mockMessagesWithNames = await fetch('http://localhost:3001/messages').then(res => res.json());

  console.log(mockMessagesWithNames)


  // todo: this should be implemented in the server. Chat Messages should already have the authors' names.
  // todo: remove this mapping when getting the data from the server
  // const mockMessagesWithNames = mockMessages.map((message: Message) => {
  //   const author = mockUsers.find(user => user.id === message.authorId);
  //   const authorName = author && author.name;
  //   return { ...message, authorName };
  // });

  return mockMessagesWithNames;
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers() {
  // todo: replace this with fetch to get the user list from the server
  const users = await fetch('http://localhost:3001/users').then(res => res.json());
  return users;
}


/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {
  // todo: replace this with fetch to get the user details from the server.
  //  For mocking example, we're calling an external JSON service.
  //  You can use mockUserDetails.ts for the list of user details in the server.
  const res = await fetch(`http://localhost:3001/users/${userId}`).then(res => res.json());
  return res;
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
  
  //fetch from server newMsg

  const res = await fetch('http://localhost:3001/newMsg', {
    method: 'POST',
    headers: { 'content-Type': 'application/json'},
    body: JSON.stringify(message)
  })



}

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(messageId: number, userId: number, like: boolean) {
  // todo: implement sending a rquest to change the like of a message by the user

  const res = await fetch('http://localhost:3001/updateLike', {
    method: 'POST',
    headers: { 'content-Type': 'application/json'},
    body: JSON.stringify({messageId, userId, like})
  })
}