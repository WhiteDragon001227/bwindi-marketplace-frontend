// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarketplace {
    mapping (address => mapping(uint256 => Sale)) public nftContractSales;
    mapping(address => uint256) failedTransferCredits;  // It saves the sent money for failed recipients
    struct Sale {
        uint32 bidIncreasePercentage;
        uint256 auctionBidPeriod; //Increments the length of time the auction is open in which a new bid can be made after each bid.
        uint256 auctionEnd;
        uint256 minPrice;
        uint256 buyNowPrice;
        address nftSeller;
        uint256 nftHighestBid;
        address nftHighestBidder;
        address whitelistedBuyer; //The seller can specify a whitelisted address for a sale (this is effectively a direct sale).
        address nftRecipient; //The bidder can specify a recipient for the NFT if their bid is successful.
        address ERC20Token; // The seller can specify an ERC20 token that can be used to bid or purchase the NFT.
    }

    // -----------------------------Start Modifiers----------------------------

    modifier onlyOwner(address _nftContractAddress, uint256 _tokenId, address _sender) {
        require (_ownerOf(_nftContractAddress, _tokenId) == _sender, "You are not the owner");
        _;
    }

    // ------------------------------End Modifiers----------------------------

    // ------------------------------Internal Functions-------------------------------
    function _resetSale(
        address _nftContractAddress,
        uint256 _tokenId
    ) internal {
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        sale.nftSeller = address(0);
        sale.minPrice = 0;
        sale.buyNowPrice = 0;
        sale.auctionBidPeriod = 0;
    }

    function _isERC20Auction(address _auctionERC20Token) internal pure returns (bool)
    {
        return _auctionERC20Token != address(0);
    }

    function _isOnSale(
        address _nftContractAddress,
        uint256 _tokenId
    ) internal view returns (bool) {
        return !(nftContractSales[_nftContractAddress][_tokenId].nftSeller == address(0));
    }

    function _isFirstBidMade(
        address _nftContractAddress,
        uint256 _tokenId
    ) internal view returns (bool) {
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        return (sale.nftHighestBid >= sale.minPrice);
    }

    function _ownerOf(
        address _nftContractAddress,
        uint256 _tokenId
    ) internal view returns (address) {
        IERC721 nftContract = IERC721(_nftContractAddress);
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        if (sale.nftSeller == address(0)) {
            return nftContract.ownerOf(_tokenId);
        }
        return sale.nftSeller;
    }

    function _payout(
        address _nftContractAddress,
        uint256 _tokenId,
        address _recipient,
        uint256 _price
    ) internal {
        address auctionERC20Token = nftContractSales[_nftContractAddress][_tokenId].ERC20Token;
        if (_isERC20Auction(auctionERC20Token)) {
            IERC20(auctionERC20Token).transfer(_recipient, _price);
        } else {
            (bool success, ) = payable(_recipient).call{ value: _price, gas: 21000 }("");
            if (!success) {
                failedTransferCredits[_recipient] = failedTransferCredits[_recipient] + _price;
            }
        }
    }

    function _setSale(
        address _nftContractAddress,
        uint256 _tokenId,
        uint32 _bidIncreasePercentage,
        uint256 _auctionBidPeriod,
        uint256 _minPrice,
        uint256 _buyNowPrice,
        address _ERC20Token
    ) internal {
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        sale.bidIncreasePercentage = _bidIncreasePercentage;
        sale.auctionBidPeriod = _auctionBidPeriod;
        sale.minPrice = _minPrice;
        sale.buyNowPrice = _buyNowPrice;
        sale.ERC20Token = _ERC20Token;
    }

    function _updateHighestBid(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _price
    ) internal {
        address auctionERC20Token = nftContractSales[_nftContractAddress][_tokenId].ERC20Token;
        if (_isERC20Auction(auctionERC20Token)) {
            IERC20(auctionERC20Token).transferFrom(
                msg.sender,
                address(this),
                _price
            );
        }
        nftContractSales[_nftContractAddress][_tokenId].nftHighestBid = _price;
        nftContractSales[_nftContractAddress][_tokenId].nftHighestBidder = msg.sender;
    }

    function _reversePreviousBidAndYUpdateHighestBid(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _price
    ) internal {
        address prevNftHighestBidder = nftContractSales[_nftContractAddress][_tokenId].nftHighestBidder;
        uint256 prevNftHighestBid = nftContractSales[_nftContractAddress][_tokenId].nftHighestBid;
        _updateHighestBid(_nftContractAddress, _tokenId, _price);
        if (prevNftHighestBidder != address(0)) {
            _payout(
                _nftContractAddress,
                _tokenId,
                prevNftHighestBidder,
                prevNftHighestBid
            );
        }
    }

    event PutOnSale(
        address _nftContractAddress,
        uint256 _tokenId,
        uint32 _bidIncreasePercentage,
        uint256 _auctionBidPeriod,
        uint256 _minPrice,
        uint256 _buyNowPrice,
        address _ERC20Token
    );
    //This can be sale or auction.
    function putOnSale(
        address _nftContractAddress,
        uint256 _tokenId,
        uint32 _bidIncreasePercentage,
        uint256 _auctionBidPeriod,
        uint256 _minPrice,
        uint256 _buyNowPrice,
        address _ERC20Token 
    ) public {
        IERC721 nftContract = IERC721(_nftContractAddress);
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Only owner can put NFT on sale");
        require(sale.nftSeller == address(0), "This NFT is already on sale");
        _setSale(
            _nftContractAddress, 
            _tokenId,
            _bidIncreasePercentage,
            _auctionBidPeriod,
            _minPrice,
            _buyNowPrice,
            _ERC20Token
        );
        sale.nftSeller = msg.sender;
        nftContract.transferFrom(msg.sender, address(this), _tokenId);
        emit PutOnSale(
            _nftContractAddress, 
            _tokenId,
            _bidIncreasePercentage,
            _auctionBidPeriod,
            _minPrice,
            _buyNowPrice,
            _ERC20Token
        );
    }

    function cancelSale(
        address _nftContractAddress,
        uint256 _tokenId
    ) public {
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        require(sale.nftSeller == msg.sender, "Only owner can cancel the sale");
        _resetSale(_nftContractAddress, _tokenId);
    }

    function buyFromSale(
        address _nftContractAddress,
        uint256 _tokenId
    ) public payable {
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        IERC721 nftContract = IERC721(_nftContractAddress);
        require(msg.value == sale.buyNowPrice, "The prices do not match!");
        require(msg.sender != sale.nftSeller, "Seller can't buy his NFT!");
        payable(sale.nftSeller).transfer(msg.value);
        _resetSale(_nftContractAddress, _tokenId);
        nftContract.transferFrom(address(this), msg.sender, _tokenId);
    }

    function makeBid(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _price
    ) public payable {
        Sale storage sale = nftContractSales[_nftContractAddress][_tokenId];
        require(msg.sender != sale.nftSeller, "Seller can't bid to his NFT!");
        // The bid price meets the instant price
        if (sale.buyNowPrice > 0 && _price == sale.buyNowPrice) {
            // buyFromSale{ value: _price }(_nftContractAddress, _tokenId);
        }
        if(_isFirstBidMade(_nftContractAddress, _tokenId)) {
            require(_price >= sale.minPrice, "You bid must be higher than min price");
            sale.auctionEnd = sale.auctionBidPeriod + block.timestamp;
            sale.nftHighestBid = _price;
            sale.nftHighestBidder = msg.sender;
        } else {
            require(block.timestamp <= sale.auctionEnd, "The auction period is over");
            require(sale.nftHighestBid * (100 + sale.bidIncreasePercentage) <= _price, "Your bid must be higher than prev bid!");
            sale.nftHighestBid = _price;
            sale.nftHighestBidder = msg.sender;
        }
    }

}