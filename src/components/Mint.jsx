import React from 'react'
import {GlobalStore} from '../context/GlobalState'
import Button from '@mui/material/Button';

const Mint = () => {
    const { mintToken } = GlobalStore();
    return (
        <div>
        <Button variant="contained" onClick={() => mintToken()}>Mint NFT</Button>
                
        </div>
    )
}

export default Mint