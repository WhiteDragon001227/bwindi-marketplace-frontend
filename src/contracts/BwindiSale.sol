// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BwindiSale {
    mapping(address => mapping(uint256 => Sale)) public nftContractSales;
    struct Sale {
        bool onSale;
        address nftSeller;
        uint256 price;
        address nftRecipient; //The bidder can specify a recipient for the NFT if their bid is successful.
        address erc20Token; // The seller can specify an ERC20 token that can be used to bid or purchase the NFT.
    }

    constructor() 
    {
    }

    function isOnSale(address _nftContractAddress, uint256 _tokenId) public view returns (bool) {
        return nftContractSales[_nftContractAddress][_tokenId].onSale;
    }

    function putOnSale(address _nftContractAddress, uint256 _tokenId, uint256 price, address _erc20Token) public {
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        require(IERC721(_nftContractAddress).ownerOf(_tokenId) != address(0), "This token id non exists!");
        require(IERC721(_nftContractAddress).ownerOf(_tokenId) == msg.sender, "This token id non exists!");
        require(sale.onSale == false, "The NFT is already on sale");
        sale.onSale = true;
        sale.price = price;
        sale.nftSeller = msg.sender;
        sale.erc20Token = _erc20Token;
        IERC721(_nftContractAddress).transferFrom(msg.sender, address(this), _tokenId);
    }

    function buyFromSale(address _nftContractAddress, uint256 _tokenId) public payable {
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        require(sale.onSale == true, "The NFT is not on sale");
        require(sale.nftSeller != msg.sender, "The seller can't buy nft!");
        require(IERC721(_nftContractAddress).ownerOf(_tokenId) == address(this), "This token is not on the sale!");
        require(sale.price == msg.value, "The price is not match");
        if (sale.erc20Token == address(0)) {
            payable(sale.nftSeller).transfer(sale.price);
            IERC721(_nftContractAddress).transferFrom(address(this), msg.sender, _tokenId);
        }
        else {
            IERC20(sale.erc20Token).transferFrom(msg.sender, sale.nftSeller, sale.price);
            IERC721(_nftContractAddress).transferFrom(address(this), msg.sender, _tokenId);
        }
        sale.onSale = false;
        sale.nftSeller = address(0);
        sale.erc20Token = address(0);
    }

    function cancelSale(address _nftContractAddress, uint256 _tokenId) public {
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        require (sale.nftSeller == msg.sender, "You are not the seller");
        sale.onSale = false;
        sale.price = 0;
        sale.nftSeller = address(0);
        sale.erc20Token = address(0);
        IERC721(_nftContractAddress).transferFrom(address(this), msg.sender, _tokenId);
    }
}