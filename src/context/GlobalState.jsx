import { createContext, useEffect, useContext, useState } from "react";
import Web3Modal from "web3modal";
import { abi } from '../artifacts/contracts/SHEIR.sol/SHEIR.json';
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import Swal from 'sweetalert2';
import { ethers } from 'ethers';

const contractAddress = '0x1Dd0D5cd7577E4C26B6F30CbC662D66a2F92A979'

const { ethereum } = window;


// const getChainID = async () => {
//     try {
//         // if (window.ethereum !== undefined) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         if (ethereum) {
//             const { chainId } = await provider.getNetwork()
//             console.log("ChainID", chainId);
//             if (chainId != '04') {
//                 Swal.fire("Please select Rinkeby Test Chain")
//             }
//             return chainId;
//         }
//     } catch (error) {
//         console.log("Wallet Not Connected", error)
//     }
// }

// const getContract = async () => {
//     try {
//         // if (window.ethereum !== undefined) {
//         if (ethereum) {
//             const provider = new ethers.providers.Web3Provider(ethereum);
//             const signer = provider.getSigner();
//             const contract = new ethers.Contract(contractAddress, abi, signer);

//             return contract;
//         }
//     } catch (error) {
//         console.log("Wallet Not Connected", error)
//     }
// }



export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {

    const [totalMinted, setTotalMinted] = useState(0);
    const [balance, setBalance] = useState();
    const [currentAccount, setCurrentAccount] = useState("");
    const [web3Modal, setWeb3Modal] = useState(null)

    const providerOptions = {
        /* See Provider Options Section */
        walletconnect: {
          display: {
            name: "Mobile"
          },
          package: WalletConnectProvider,
          options: {
            infuraId: "17342b0f3f344d2d96c2c89c5fddc959" // required
          }
        }
      };

      const getModalConnect = async () => {
        const web3Modal = new Web3Modal({
          cacheProvider: true, // very important
          network: "rinkeby",
          providerOptions,
        });
        console.log("Web3Modal : ", web3Modal)
        setWeb3Modal(web3Modal)
    //   }

        // const instance = await web3Modal.connect();
        // console.log("instance : ", instance)
        // const provider = new ethers.providers.Web3Provider(instance);
        // const signer = provider.getSigner();
        // const contract = new ethers.Contract(contractAddress, abi, signer);
        // const accounts = await web3.eth.getAccounts();
    }

    const getContract = async () => {
        const provider = await web3Modal.connect();
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(contract)
        return contract
    };
    //functions
    const getCount = async () => {
        const contract = await getContract();
        const count = await contract.totalSupply();
        console.log(parseInt(count));
        setTotalMinted(parseInt(count));
    };

    // const getMintedStatus = async () => {
    // const contract = await getContract();
    //     const result = await contract.totalSupply();
    //     console.log(result)
    //     if (tokenId < result) {
    //         setIsMinted(true);
    //     }
    // };

    async function getURI({ tokenId }) {
        const contract = await getContract();
        const uri = await contract.tokenURI(tokenId);
        console.log("tokenID : ", tokenId)
        console.log("uri", uri.toString())
        Swal.fire(uri.toString());
    }

    const mintToken = async () => {
        // const contract = await getModalConnect();
        const contract = await getContract();
        // const connection = contract.connect(signer);
        // console.log("connection", connection)
        // const addr = connection.address;
        // console.log("addr", addr)
        const result = await contract.mintNFTs(1, {
            value: ethers.utils.parseEther('0.01')
        });
        await result.wait();
        // getMintedStatus();
        // getCount();
    }

    // disconnect wallet
    const disconnectWallet = async () => {
        await web3Modal.clearCachedProvider()
    }

    const getBalance = async () => {
        const provider = await web3Modal.connect();
        const ethersProvider = new ethers.providers.Web3Provider(provider)
        const signer = ethersProvider.getSigner();
        const acc = await signer.getAddress()
        // const [account] = await ethereum.request({ method: 'eth_requestAccounts' })
        setCurrentAccount(acc);
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accountBalance = await signer.getBalance(acc);
        setBalance(ethers.utils.formatEther(accountBalance));
        return accountBalance
    };

    // useEffect(() => {
    //     const initial = async () => {
    //         if (currentAccount) {
    //             // await getChainID();
    //             // await getBalance();
    //         }
    //         initial();
    //     }
    // }, [currentAccount]);

    useEffect(() => {
        const modalRun = async () => {
            if (web3Modal) {
                await getCount()
                // const contract = await getContract();
                // console.log(contract)
                // const count = await contract?.totalSupply();
                // await count.wait();
                // setTotalMinted(parseInt(count));
            }

        }
        modalRun();
    }, [web3Modal]);

    return (
        <GlobalContext.Provider value={{
            totalMinted, getCount, balance, currentAccount, getBalance, mintToken, getURI, getModalConnect, disconnectWallet
        }} >
            {children}
        </GlobalContext.Provider>
    )
}

export const GlobalStore = () => useContext(GlobalContext);