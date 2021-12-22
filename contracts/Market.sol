// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import './zNFT.sol';

contract Market {
  enum Categories {
      ART, GAME, DEFI, MEMES
      }
  struct Auction {
    address payable seller;
    uint minBid;
    Categories category;
    uint endDate;
    address payable highestBidAddress;
    uint highestBidAmount;
  }
  mapping(address => mapping(uint => Auction)) public auctions;

  event AuctionCreated(
    address tokenAddress,
    uint tokenId,
    address seller,
    uint minBid,
    Categories category,
    uint endDate
  );

  //doesn't check to see if the auction creator is actually the token holder tho??
  function createAuction(address _tokenAddress, uint _tokenId,uint _minBid, uint duration, Categories _category) external {
    Auction storage auction = auctions[_tokenAddress][_tokenId];
    require(auction.endDate == 0, 'auction already exist'); 
    //it autocorrected to ZNFT and i changed it back to zNFT but idk if it still is recognizing the contract
    ZNFT(_tokenAddress).transferFrom(msg.sender, address(this), _tokenId);
    auction.seller = payable(msg.sender); 
    auction.minBid = _minBid; 
    auction.category = _category; 
    //changed it from 7 so that you can customize how long this auction goes for
    auction.endDate = block.timestamp + duration  * 86400; 
    auction.highestBidAddress = payable(address(0));
    auction.highestBidAmount = 0;

    emit AuctionCreated({
      tokenAddress: _tokenAddress,
      tokenId: _tokenId,
      seller: msg.sender, 
      minBid: _minBid, 
      category: _category, 
      endDate: block.timestamp + duration * 86400
    });
  }
//there is no bid amount in this function, have to create that later as of right now it's just going by msg.value 
  function createBid(address _tokenAddress, uint _tokenId) external payable {
    Auction storage auction = auctions[_tokenAddress][_tokenId];
    require(auction.endDate != 0, 'auction does not exist');
    require(auction.endDate >= block.timestamp, 'auction is finished');
    //check to see if the value is higher than the highest bid and higher than the minimum
    require(auction.highestBidAmount < msg.value && auction.minBid < msg.value, 'bid amount is too low');
    //reimburse previous bidder
    auction.highestBidAddress.transfer(auction.highestBidAmount);
    auction.highestBidAddress = msg.sender;
    auction.highestBidAmount = msg.value; 
  }

  function closeBid(address _tokenAddress, uint _tokenId) external {
    Auction storage auction = auctions[_tokenAddress][_tokenId];
    require(auction.endDate != 0, 'auction does not exist');
    require(auction.endDate < block.timestamp, 'auction is not finished');
    if(auction.highestBidAmount == 0) {
      //auction failed, no bidder showed up.
      ZNFT(_tokenAddress).transferFrom(address(this), auction.seller, _tokenId);
      delete auctions[_tokenAddress][_tokenId];
    } else {
      //auction succeeded, send money to seller, and token to buyer
      auction.seller.transfer(auction.highestBidAmount);
      ZNFT(_tokenAddress).transferFrom(address(this), auction.highestBidAddress, _tokenId);
      delete auctions[_tokenAddress][_tokenId];
    }
  }
}