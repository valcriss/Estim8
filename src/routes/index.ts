import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const pseudo = req.session?.pseudo
  res.render('index', { pseudo })
})

router.post('/join', (req: Request, res: Response) => {
  const pseudo = req.body.pseudo?.trim()
  if (pseudo) {
    req.session.pseudo = pseudo
    res.redirect('/room')
  } else {
    res.render('index', { error: 'Veuillez entrer un pseudo.' })
  }
})

router.get('/room', (req: Request, res: Response) => {
  if (!req.session?.pseudo) return res.redirect('/')
  res.render('room', { pseudo: req.session.pseudo })
})

export default router
