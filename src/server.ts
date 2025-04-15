import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
import RoomManager from './core/RoomManager';

const PORT = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server);

const participantBySocket = new Map<string, { roomId: string; name: string }>();

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, pseudo }) => {
    socket.join(roomId);
    participantBySocket.set(socket.id, { roomId, name: pseudo });
  
    const room = RoomManager.getRoom(roomId);
    if (room) {
      room.addParticipant({ id: socket.id, name: pseudo });
  
      // Envoie la liste complète des participants au nouvel arrivant
      socket.emit('room-participants', {
        participants: room.participants,
      });
  
      // Préviens les autres
      socket.to(roomId).emit('participant-joined', { name: pseudo });
    }
  });

  socket.on('disconnect', () => {
    const data = participantBySocket.get(socket.id);
    if (data) {
      const { roomId, name } = data;

      const room = RoomManager.getRoom(roomId);
      if (room) {
        room.removeParticipantByName(name);
        io.to(roomId).emit('participant-left', { name });
      }

      participantBySocket.delete(socket.id);
    }
  });

  socket.on('start-estimation', (roomId) => {
    const room = RoomManager.getRoom(roomId);
    if (room) {
      room.startEstimation();
      io.to(roomId).emit('estimation-started');
    }
  });
  
  socket.on('vote', ({ roomId, participantId, value }) => {
    const room = RoomManager.getRoom(roomId);
    if(!room)
    {
      console.error(`Room ${roomId} not found`);
    }
    if (room?.estimationSession) {
      room.estimationSession.vote(participantId, value);
  
      // On notifie que cette personne a voté (sans dire quoi)
      io.to(roomId).emit('participant-voted', { participantId });
    }
    else
    {
      console.error(`Estimation session not found for room ${roomId}`);
    }
  });
  
  socket.on('reveal-votes', (roomId) => {
    const room = RoomManager.getRoom(roomId);
    if (room?.estimationSession) {
      room.estimationSession.reveal();
      const votes = Array.from(room.estimationSession.getVotes());
      io.to(roomId).emit('votes-revealed', { votes });
    }
  });
  
});

server.listen(PORT, () => {
  console.log(`🚀 Estim8 lancé sur http://localhost:${PORT}`);
});
