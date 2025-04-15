function index_radio_clicked() {
  const checkedRadio = document.querySelector('input[name="action"]:checked')
  const checkedValue = checkedRadio.value
  const joinRoomDiv = document.getElementById('join-room-div')
  const joinRoomInput = document.getElementById('join-room-input')
  const submitButton = document.getElementById('submit-button')

  if (checkedValue === 'create') {
    joinRoomDiv.style.display = 'none'
    joinRoomInput.value = ''
    joinRoomInput.removeAttribute('required')
    submitButton.innerText = 'Créer une room'
  } else {
    joinRoomDiv.style.display = 'block'
    submitButton.innerText = 'Rejoindre une room'
    joinRoomInput.setAttribute('required', '')
    joinRoomInput.focus()
  }
}
