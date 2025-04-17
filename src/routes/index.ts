import { Router, Request, Response } from 'express';
import RoomManager from '../core/RoomManager';
import Configuration from '../configuration/Configuration';
import UserUtils from '../tools/UserUtils';

const router = Router();

router.get('/', (req: Request, res: Response) => {

  const userDeviceId = UserUtils.getUserDeviceId(req.sessionID);
  
  res.render('index', {
    siteName: Configuration.getSiteName(),
    pseudo: req.session.pseudo,
    userDeviceId: userDeviceId,
    error: req.session.error,
    prefillRoomCode: req.session.prefillRoomCode,
  });
  
  delete req.session.error;
  delete req.session.prefillRoomCode;
});

// Soumission du pseudo
router.post('/join', (req: Request, res: Response) => {
  const userDeviceId = UserUtils.getUserDeviceId(req.sessionID);
  const pseudo = req.body.pseudo?.trim();
  const action = req.body.action;
  const roomCode = req.body.roomCode?.trim();

  if (!pseudo) {
    req.session.error = 'Veuillez entrer un pseudo.';
    return res.redirect('/');
  }

  req.session.pseudo = pseudo;
  console.log('action', action);
  if (action === 'create') {
    return res.redirect('/room/new');
  }

  if (action === 'join' && roomCode) {
    if(RoomManager.getRoom(roomCode)) {
      return res.redirect(`/room/${roomCode}`);
    }
  }

  req.session.error = 'Code de room invalide.';
  return res.redirect('/');
});

export default router;
