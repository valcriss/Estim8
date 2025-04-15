import { Router, Request, Response } from 'express';
import RoomManager from '../core/RoomManager';

const router = Router();

// Formulaire de création
router.get('/new', (_req: Request, res: Response) => {
  res.render('create-room');
});

// Création de room
router.post('/new', (req: Request, res: Response) => {
  const name = req.body.roomName?.trim();
  const pseudo = req.session?.pseudo;

  if (!name || !pseudo) return res.redirect('/');

  const room = RoomManager.createRoom(name);
  const participant = RoomManager.joinRoom(room.id, pseudo);

  req.session.roomId = room.id;
  req.session.participantId = participant?.id;

  res.redirect(`/room/${room.id}`);
});

// Affichage de la room
// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.get('/:id', (req: Request, res: Response) => {
  const roomId = req.params.id;
  const room = RoomManager.getRoom(roomId);

  const pseudo = req.session?.pseudo;
  if (!room || !pseudo) {
    req.session.error = 'Veuillez entrer un pseudo pour rejoindre une room.';
    req.session.prefillRoomCode = roomId;
    return res.redirect('/');
  }

  const participant = RoomManager.joinRoom(roomId, pseudo);
  req.session.roomId = roomId;
  req.session.participantId = participant?.id;

  res.render('room', {
    roomName: room.name,
    roomId: room.id,
    participants: room.participants,
    currentName: pseudo,
    participantId: participant?.id,
  });
});


export default router;
