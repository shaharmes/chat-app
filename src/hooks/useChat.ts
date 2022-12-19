import {useEffect, useRef, useState} from "react";
import { Message } from '../types/message';
import { mockPosts } from '../assets/mockPosts';
import { User } from '../types/user';
import { users } from '../assets/users';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(mockPosts);
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageDetails, setShowMessageDetails] = useState<boolean>(false);


  useEffect(() => {
    setMessages(mockPosts);
  }, []);

  const selectUser = (id: string) => {
    const currentUser = users.find(user => user.id === +id);
    currentUser && setCurrentUser(currentUser);
  };

  const addMessage = (event: any) => {
    if (event.key === 'Enter') {
      event.target.value && setMessages([
        ...messages, {
          id: messages.length + 1,
          timestamp: new Date(),
          likes: [],
          body: event.target.value,
          user: currentUser
        }
      ]);
    }
  };

  const toggleLike = (message: Message) => {
    const userLiked = message.likes.indexOf(currentUser.id);
    userLiked === -1 ? message.likes.push(currentUser.id) : message.likes.splice(userLiked, 1);
    setSelectedMessage({ ...message });
  };

  return {
    messages,
    currentUser,
    selectedUser,
    selectedMessage,
    showMessageDetails,
    setSelectedUser,
    setSelectedMessage,
    setShowMessageDetails,
    selectUser,
    addMessage,
    toggleLike,
  }
}