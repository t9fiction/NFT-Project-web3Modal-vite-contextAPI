import React, { useEffect, useState } from 'react'
import { GlobalStore } from '../context/GlobalState'

function NFTImage({ tokenId }) {
    const { totalMinted, getCount, mintToken, getURI } = GlobalStore();
    // const [isMinted, setIsMinted] = useState(false)
    const contentId = 'QmeLJALSfvBfvahxqYewjUFm4SKTsd3ZhbmzSNhRnj8AtU';
    const imageId = 'QmUGgMf4od8t4ATNVEqQLwaWA3DNoSSr86H3CTvf2VVBrs';
    const metadataURI = `${contentId}/${tokenId}.json`;
    const imageURI = `https://gateway.pinata.cloud/ipfs/${imageId}/${tokenId}.png`;
    // console.log("imageURI", imageURI)
    // console.log("metadataURI", metadataURI)
    
    // useEffect(() => {
        //     getMintedStatus();
        // }, [isMinted])
    
    return (
        <div>
        <script type="text/javascript" src="metadataURI" />
            <br />
            <img src={(tokenId <= totalMinted) ? imageURI : 'img/placeholder.png'} width="200" height="200"></img>
            <br />
            {/* {!(tokenId < totalMinted) ? (
                <></>
            ) : (<> */}
                <button onClick={({tokenId}) => getURI({tokenId})}>
                    Taken! Show URI
                </button>
            {/* </> */}
            {/* )} */}
            <br />
            <>ID #{tokenId}</>
            <br />
        </div>
    );
}

export default NFTImage;