import app from './app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Estim8 lancé sur http://localhost:${PORT}`)
})
