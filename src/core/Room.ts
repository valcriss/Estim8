import { EstimationSession } from './EstimationSession';

export interface Participant {
    id: string; // UUID ou autre identifiant unique
    name: string;
  }
  
  export class Room {
    public readonly id: string;
    public name: string;
    public participants: Participant[];
    public estimationSession: EstimationSession | null = null;

    constructor(id: string, name: string) {
      this.id = id;
      this.name = name;
      this.participants = [];
    }
  
    addParticipant(participant: Participant) {
      const exists = this.participants.find((p) => p.id === participant.id);
      if (!exists) this.participants.push(participant);
    }
  
    removeParticipant(id: string) {
      console.log(this.participants)
      console.log("removing id", id)
      this.participants = this.participants.filter((p) => p.id !== id);
      console.log(this.participants)
    }

    removeParticipantByName(name: string) {
      this.participants = this.participants.filter((p) => p.name !== name);
    }

    startEstimation() {
      this.estimationSession = new EstimationSession();
    }
  
    endEstimation() {
      this.estimationSession = null;
    }
  }
  