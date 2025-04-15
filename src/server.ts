import { createServer } from 'http'
import { Server } from 'socket.io'
import app from './app'
import RoomManager from './core/RoomManager'

const PORT = process.env.PORT || 3000
const server = createServer(app)
const io = new Server(server)

const participantBySocket = new Map<string, { roomId: string; clientId: string; name: string }>()

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, clientId, pseudo }) => {
    socket.join(roomId)
    participantBySocket.set(socket.id, { roomId, clientId: clientId, name: pseudo })
    console.log('join-room',participantBySocket)
    const room = RoomManager.getRoom(roomId)
    console.log('room',room)
    if (room) {
      room.addParticipant({ id: clientId, name: pseudo })
      console.log('addParticipant',room)
      socket.emit('room-participants', {
        participants: room.participants
      })

      // Ne pas renvoyer à soi-même
      socket.to(roomId).emit('participant-joined', {
        name: pseudo,
        id: clientId
      })
    }
  })

  socket.on('disconnect', () => {
    const data = participantBySocket.get(socket.id)
    if (data) {
      const { roomId, clientId, name } = data
      console.log('disconnect',socket.id, { roomId, clientId, name })
      const room = RoomManager.getRoom(roomId)
      if (room) {
        room.removeParticipant(clientId)
        io.to(roomId).emit('participant-left', { id:clientId, name })
      }
      participantBySocket.delete(socket.id)
      socket.leave(roomId)
    }
  })

  socket.on('start-estimation', (roomId) => {
    const room = RoomManager.getRoom(roomId)
    if (room) {
      room.startEstimation()
      io.to(roomId).emit('estimation-started')
    }
  })

  socket.on('vote', ({ roomId, participantId, value }) => {
    const room = RoomManager.getRoom(roomId)
    if (!room) {
      console.error(`Room ${roomId} not found`)
    }
    if (room?.estimationSession) {
      room.estimationSession.vote(participantId, value)

      // On notifie que cette personne a voté (sans dire quoi)
      io.to(roomId).emit('participant-voted', { participantId })
    } else {
      console.error(`Estimation session not found for room ${roomId}`)
    }
  })

  socket.on('reveal-votes', (roomId) => {
    const room = RoomManager.getRoom(roomId)
    if (room?.estimationSession) {
      room.estimationSession.reveal()
      const votes = Array.from(room.estimationSession.getVotes())
      io.to(roomId).emit('votes-revealed', { votes })
    }
  })
})

server.listen(PORT, () => {
  console.log(`🚀 Estim8 lancé sur http://localhost:${PORT}`)
})
