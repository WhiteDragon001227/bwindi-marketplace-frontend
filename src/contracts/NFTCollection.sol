// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTCollection is ERC721, ERC721Enumerable {
    string[] public tokenURIs;
    mapping(string => bool) _tokenURIExists;
    mapping(uint256 => string) _tokenIdToTokenURI;
    mapping(uint256 => address) _creators;

    event TokenCreated(
        address indexed contractAddress,
        address indexed creator,
        uint256 indexed tokenId
    );

    constructor() 
        ERC721("BwindiNFT", "BwindiNFT")
    {
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public override view returns (string memory) {
        require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
        return _tokenIdToTokenURI[tokenId];
    }

    function creatorOf(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
        return _creators[tokenId];
    }

    function createToken( string memory _tokenURI ) public {
        require(!_tokenURIExists[_tokenURI], 'The token URI should be unique');
        tokenURIs.push(_tokenURI);
        uint256 _id = tokenURIs.length;
        _tokenIdToTokenURI[_id] = _tokenURI;
        _creators[_id] = msg.sender;
        _safeMint(msg.sender, _id);
        _tokenURIExists[_tokenURI] = true;
        emit TokenCreated(address(this), msg.sender, _id);
    }
}