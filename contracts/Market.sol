// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import './zNFT.sol';
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Market is ReentrancyGuard  {

  enum Categories {
      ART, GAME, DEFI, MEMES
      }
  struct Auction {
    address payable seller;
    uint256 minBid;
    uint256 tokenID;
    uint256 buyNowPrice;
    address nftcontract;
    Categories category;
    uint endDate;
    //this used to be address payable highestBidder but took out the payable for exploit security
    address payable highestBidAddress;
    //if you want to buy it for someone else in the auction you can specify a recipient
    address recipient;
    uint highestBidAmount;
  }
  mapping(address => mapping(uint => Auction)) public auctions;

  //doesn't check to see if the auction creator is actually the token holder tho??
  function createAuction(address _tokenAddress, uint _tokenId, uint _minBid, uint _buyNowPrice, uint duration, Categories _category) external {
    Auction storage auction = auctions[_tokenAddress][_tokenId];
    require(auction.endDate == 0, 'auction already exist'); 
    require(_minBid >= 0, "must set up a minimum bid");
    //it autocorrected to ZNFT and i changed it back to zNFT but idk if it still is recognizing the contract
    IERC721(_tokenAddress).transferFrom(msg.sender, address(this), _tokenId);
    auction.seller = payable(msg.sender); 
    auction.minBid = _minBid;
    auction.buyNowPrice = _buyNowPrice;
    auction.category = _category; 
    //changed it from 7 so that you can customize how long this auction goes for
    auction.endDate = block.timestamp + duration  * 86400; 
    auction.highestBidAddress = payable(address(0));
    auction.highestBidAmount = 0;
    emit AuctionCreated(_tokenAddress, _tokenId, msg.sender, _minBid, _category, block.timestamp + duration * 86400);
  }

//there is no bid amount in this function, have to create that later as of right now it's just going by msg.value 
  function createBid(address _tokenAddress, uint _tokenId) external payable {
  //if you bid higher it is considered a tip to the seller
    if(msg.value >= auctions[_tokenAddress][_tokenId].buyNowPrice){
      //auction succeeded, send money to seller, and token to buyer
      auctions[_tokenAddress][_tokenId].seller.transfer(msg.value);
      IERC721(_tokenAddress).transferFrom(address(this), msg.sender, _tokenId);
      delete auctions[_tokenAddress][_tokenId];
    }
    require(auctions[_tokenAddress][_tokenId].endDate != 0, 'auction does not exist');
    require(auctions[_tokenAddress][_tokenId].endDate >= block.timestamp, 'auction is finished');
    //check to see if the value is higher than the highest bid and higher than the minimum
    require(auctions[_tokenAddress][_tokenId].highestBidAmount < msg.value && auctions[_tokenAddress][_tokenId].minBid < msg.value, 'bid amount is too low');
    //reimburse previous bidder
    auctions[_tokenAddress][_tokenId].highestBidAddress.transfer(auctions[_tokenAddress][_tokenId].highestBidAmount);
    auctions[_tokenAddress][_tokenId].highestBidAddress = payable(msg.sender);
    auctions[_tokenAddress][_tokenId].highestBidAmount = msg.value; 
    emit BidMade(_tokenAddress, _tokenId, auctions[_tokenAddress][_tokenId].highestBidAddress, msg.value);
  }

  function closeBid(address _tokenAddress, uint _tokenId) external {
    require(auctions[_tokenAddress][_tokenId].endDate != 0, 'auction does not exist');
    require(auctions[_tokenAddress][_tokenId].endDate < block.timestamp, 'auction is not finished');
    if(auctions[_tokenAddress][_tokenId].highestBidAmount == 0) {
      //auction failed, no bidder showed up.
      IERC721(_tokenAddress).transferFrom(address(this), auctions[_tokenAddress][_tokenId].seller, _tokenId);
      delete auctions[_tokenAddress][_tokenId];
    } else {
      //auction succeeded, send money to seller, and token to buyer
      auctions[_tokenAddress][_tokenId].seller.transfer(auctions[_tokenAddress][_tokenId].highestBidAmount);
      IERC721(_tokenAddress).transferFrom(address(this), auctions[_tokenAddress][_tokenId].highestBidAddress, _tokenId);
      delete auctions[_tokenAddress][_tokenId];
    }
  }
    /*╔══════════════════════════════╗
      ║    AUCTION CHECK FUNCTIONS   ║
      ╚══════════════════════════════╝*/

    /*
     * Check if a bid has been made. This is applicable in the early bid scenario
     * to ensure that if an auction is created after an early bid, the auction
     * begins appropriately or is settled if the buy now price is met.
     */
    function _isBidMade(address _tokenAddress, uint256 _tokenId) internal view returns (bool){
        return (auctions[_tokenAddress][_tokenId].highestBidAmount > 0);
    }

    
    /*╔══════════════════════════════╗
      ║    AUCTION Events            ║
      ╚══════════════════════════════╝*/

    event AuctionCreated(
        address tokenAddress,
        uint tokenId,
        address seller,
        uint minBid,
        Categories category,
        uint endDate
    );

    event NFTTransferredAndSellerPaid(
        address nftContractAddress,
        uint256 tokenId,
        address nftSeller,
        uint128 nftHighestBid,
        address nftHighestBidder,
        address nftRecipient
    );

    event AuctionSettled(
        address nftContractAddress,
        uint256 tokenId,
        address auctionSettler
    );

    event AuctionWithdrawn(
        address nftContractAddress,
        uint256 tokenId,
        address nftOwner
    );

    event BidWithdrawn(
        address nftContractAddress,
        uint256 tokenId,
        address highestBidder
    );

    event BidMade(
        address nftContractAddress,
        uint256 tokenId,
        address bidder,
        uint256 bidAmount
    );
}