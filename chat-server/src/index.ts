
import { mockMessages } from './assets/mockMessages';
import { mockUsers } from './assets/mockUsers';
import express from 'express';
import { mockUserDetails } from './assets/mockUserDetails';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;
app.use(cors());

app.get('/', (req, res) => {
    res.send(mockMessages);
    }
);

app.get('/messages', (req, res) => {
    const mockMessagesWithNames = mockMessages.map((message) => {
        const author = mockUserDetails.find(user => user.id === message.authorId);
        const authorName = author && author.name;
        return { ...message, authorName };
    });
    res.send(mockMessagesWithNames);
});

app.get('/users', (req, res) => {
    const mockUserIdWithNames = mockUserDetails.map((user) => {
        const { id, name } = user;
        return { id, name };
    });

    res.send(mockUserIdWithNames);
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = mockUserDetails.find(user => user.id === +id);
    res.send(user);
});

app.post('/newMsg', bodyParser.json(), (req, res) => {
    const msg = req.body;
    const authorName = mockUserDetails.find(user => user.id === msg.authorId);
    const likes = [0];
    const newMessage = { ...msg, authorName, likes };
    mockMessages.push(newMessage);
    res.sendStatus(200);
});

app.post('/updateLike', bodyParser.json(), (req, res) => {
    const obj = req.body;
    const msgId: number = obj.messageId;
    const userId: number = obj.userId;
    const like: boolean = obj.like;
    let newMsg = mockMessages.filter((msg) => msg.id === msgId);
    if (newMsg[0].likes.includes(userId)) {
      newMsg[0].likes.map((element, index) => {
        if (element === userId) {
          newMsg[0].likes.splice(index, 1);
        }
      });
    } else{
        newMsg[0].likes.push(userId);
    }
    res.sendStatus(200);
    });


app.listen(port, () => {
    console.log('Server started on port 3000');
});