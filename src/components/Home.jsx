import React, { useEffect, useState } from 'react'
import WalletBalance from './WalletBalance'
import NFTImage from './NFTImage';
import {GlobalStore} from '../context/GlobalState'
import Mint from './Mint';



const Home = () => {
    const { totalMinted, getCount } = GlobalStore();
    

    // useEffect(() => {
    //     getCount()
    // }, [])

    return (
        <div>
            <WalletBalance />
            <h1>SHEIR NFTs</h1>
            <Mint />
            {Array(totalMinted)
                .fill(0)
                .map((_, i) => (
                    <div key={i}>
                        <NFTImage tokenId={i} />
                        {/* <>NFT # {i}</> */}
                    </div>
                ))}
        </div>
    )
}

export default Home