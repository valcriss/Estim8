function getClientId() {
  let clientId = window.sessionStorage.getItem('uniqId')
  if (clientId === null) {
    clientId = Math.random().toString(36).substr(2, 9)
    window.sessionStorage.setItem('uniqId', clientId)
  }
  return clientId
}
