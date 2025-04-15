export class EstimationSession {
    private votes: Map<string, string> = new Map(); // participantId → valeur
    public revealed = false;
  
    vote(participantId: string, value: string) {
      if (!this.revealed) {
        this.votes.set(participantId, value);
      }
    }
  
    getVotes(): Map<string, string> {
      return this.votes;
    }
  
    reveal() {
      this.revealed = true;
    }
  
    reset() {
      this.votes.clear();
      this.revealed = false;
    }
  }
  