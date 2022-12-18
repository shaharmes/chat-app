import { useState } from 'react'
import './App.scss'
import { mockPosts } from './assets/mockPosts'
import { users } from './assets/users';

/*const fullPosts = posts.map((post, index) => {
  const randomUser = Math.floor(Math.random()*10);
  console.log(randomUser);
  const now = new Date();
  return {...post, user: users[randomUser], timestamp: now.setMinutes(now.getMinutes() - 200 + index), likes: randomUser};
});

console.log(fullPosts)*/

function App() {
  const [messages, setMessages] = useState(mockPosts);

  return (

    <div className="App">
      <div className="chat">
        {messages.map(message => (
          <div className="message" key={message.id}>
            <div className="message-header">
              <span className="message-time">{new Date(message.timestamp).toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric", hour: "2-digit", minute: "2-digit"
              })}</span>
              <span className="message-author">{message.user.name}</span>
              <span className="message-likes">{message.likes}</span>
            </div>
            <div className="message-body">
              {message.body}
            </div>
          </div>
        ))}

      </div>

      <div className="write-message">
        <select>
          {users.map(user => (
            <option id={user.name}>{user.name}</option>
          ))}
        </select>

        <input name="message" className="message-input"/>

      </div>
    </div>
  )
}

export default App;
