//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SHEIR is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    // Delcaring variable
    uint public constant MAX_SUPPLY = 1000; // total amount needs to change as per the requirement
    uint public PRICE = 0.01 ether; //price needs to reset as per the requirement

    string public baseTokenURI;
    
    constructor(string memory baseURI) ERC721("SHAIR", "SHR"){  //Name and Symbol needs to change as per the requirement
        setBaseURI(baseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
     return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function setPRICE(uint _price) public onlyOwner {
        PRICE = _price;
    }

    function reserveNFTs(uint _count) public onlyOwner {
     uint totalMinted = _tokenIds.current();
     require(
        totalMinted.add(_count) < MAX_SUPPLY, "Not enough NFTs"
     );
     for (uint i = 0; i < _count; i++) {
          _mintSingleNFT();
     }
}

    // Minting Function
    function mintNFTs(uint _count) public payable{
        uint totalMinted = _tokenIds.current();
        require(totalMinted <= MAX_SUPPLY, "Exceeded the total Supply");
        require(_count > 0 && _count <= (MAX_SUPPLY - totalMinted), "_count needs to be greater then 0 and less then the total supply");
        require(msg.value >= PRICE.mul(_count), "Not enough ether to purchase NFTs.");
        for(uint i=0; i<_count; i++){
            _mintSingleNFT();
        }
    }


    // Private function for minting a single NFT
    function _mintSingleNFT() internal {
        uint newTokenID = _tokenIds.current();
        _safeMint(msg.sender, newTokenID);
        _tokenIds.increment();
    }

       
    // Ether withdraw function
    function withdraw() public payable onlyOwner{
        uint balance = address(this).balance;
        require(balance > 0, "No Ether to withdraw");
        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }

}