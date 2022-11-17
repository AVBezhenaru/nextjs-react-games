import io from 'socket.io-client'

const URL = 'Backend url here'

const socet = io(URL)

var mySocketId

socet.on('createNewGame', statusUpdate => {
  mySocketId = statusUpdate.mySocketId
})

export {
  socet,
  mySocketId
}