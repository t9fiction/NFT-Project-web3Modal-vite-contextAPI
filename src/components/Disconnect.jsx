import React from 'react'
import {GlobalStore} from '../context/GlobalState'
import Swal from 'sweetalert2';

const Disconnect = () => {
    const { disconnectWallet } = GlobalStore();
    const handleClick = ()=>{
      disconnectWallet()
      Swal.fire("Wallet has been disconnected. Please refresh the page");
    }
  return (
    <button onClick={()=>handleClick()}>Disconnect</button>
  )
}

export default Disconnect