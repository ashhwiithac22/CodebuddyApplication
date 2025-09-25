import { Server } from 'socket.io';

class SocketService {
  constructor() {
    this.io = null;
    this.sessions = new Map();
  }

  initialize(server) {
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
      }
    });

    this.io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('join-interview', (sessionId) => {
        socket.join(sessionId);
        this.sessions.set(socket.id, sessionId);
        console.log(`User ${socket.id} joined interview session ${sessionId}`);
      });

      socket.on('voice-response', async (data) => {
        try {
          const { sessionId, transcript } = data;
          
          // Broadcast to other clients in the session
          socket.to(sessionId).emit('interview-message', {
            type: 'user',
            content: transcript,
            timestamp: new Date()
          });

          // Simulate AI processing
          socket.emit('ai-thinking', { thinking: true });
          
          setTimeout(() => {
            const aiResponses = [
              "That's an interesting perspective. Can you elaborate more on that?",
              "Good answer! Now, how would you handle a situation where...",
              "Thank you for sharing. Let me ask you a follow-up question...",
              "That's a solid approach. What would you do differently if...",
              "Interesting! How does this relate to your overall experience with..."
            ];
            
            const aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            
            socket.emit('ai-thinking', { thinking: false });
            socket.emit('interview-message', {
              type: 'ai',
              content: aiResponse,
              timestamp: new Date()
            });
          }, 2000);

        } catch (error) {
          console.error('Error handling voice response:', error);
          socket.emit('error', { message: 'Failed to process voice response' });
        }
      });

      socket.on('disconnect', () => {
        const sessionId = this.sessions.get(socket.id);
        if (sessionId) {
          socket.leave(sessionId);
          this.sessions.delete(socket.id);
        }
        console.log('User disconnected:', socket.id);
      });
    });

    return this.io;
  }
}

export default new SocketService();