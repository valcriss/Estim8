import 'express-session'

declare module 'express-session' {
  interface SessionData {
    pseudo?: string;
    roomId?: string;
    participantId?: string;
    error?: string;
    prefillRoomCode?: string;
  }
}
