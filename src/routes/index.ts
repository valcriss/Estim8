import { Router, Request, Response } from 'express';
import RoomManager from '../core/RoomManager';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index', {
    pseudo: req.session.pseudo,
    error: req.session.error,
    prefillRoomCode: req.session.prefillRoomCode,
  });
  delete req.session.error;
  delete req.session.prefillRoomCode;
});

// Soumission du pseudo
router.post('/join', (req: Request, res: Response) => {
  const pseudo = req.body.pseudo?.trim();
  const action = req.body.action;
  const roomCode = req.body.roomCode?.trim();

  if (!pseudo) {
    req.session.error = 'Veuillez entrer un pseudo.';
    return res.redirect('/');
  }

  req.session.pseudo = pseudo;

  if (action === 'create') {
    return res.redirect('/room/new');
  }

  if (action === 'join' && roomCode) {
    return res.redirect(`/room/${roomCode}`);
  }

  req.session.error = 'Code de room invalide.';
  return res.redirect('/');
});

export default router;
