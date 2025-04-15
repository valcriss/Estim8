import { Room, Participant } from './Room';
import { randomUUID } from 'crypto';
import { generateRoomCode } from './generateRoomCode';

class RoomManager {
  private rooms: Map<string, Room> = new Map();

  createRoom(name: string): Room {
    let id: string;
    do {
      id = generateRoomCode();
    } while (this.rooms.has(id));
    const room = new Room(id, name);
    this.rooms.set(id, room);
    return room;
  }

  getRoom(id: string): Room | undefined {
    return this.rooms.get(id);
  }

  joinRoom(roomId: string, clientId:string, participantName: string): Participant | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    const participant: Participant = {
      id: clientId,
      name: participantName,
    };

    room.addParticipant(participant);
    return participant;
  }
}

export default new RoomManager();
