const Market = artifacts.require('Market.sol');
const NFT721 = artifacts.require('zNFT.sol');
const ethers = require('ethers')
const { expectRevert, time } = require('@openzeppelin/test-helpers');

const CATEGORIES = {
  ART: 0,
  GAME: 1,
  DEFI: 2,
};

contract('Market', async addresses => {
  const [admin, seller, buyer1, buyer2, buyer3, _] = addresses;
  let market, nft721;
  beforeEach(async () => {
    market = await Market.new();
    nft721 = await NFT721.new('aaa', 'aaa');
    await nft721.mint(seller, 1);
    await nft721.approve(market.address, 1, {from: seller});
    await market.createAuction(
      nft.address,
      1,
      web3.utils.toWei('1'),
      CATEGORIES.GAME,
      {from: seller}
    );
  });

  it('should NOT create auction', async () => {
    await expectRevert(
      market.createAuction(
        nft.address,
        1,
        web3.utils.toWei('1'),
        CATEGORIES.GAME,
        {from: seller}
      ),
      'auction already exist'
    );
  });

  it('should NOT create bid', async () => {
    await expectRevert(
      market.createBid(
        nft721.address,
        2,
        {from: buyer1, value: web3.utils.toWei('2')}
      ),
      'auction does not exist'
    );
    await expectRevert(
      market.createBid(
        nft721.address,
        1,
        {from: buyer1, value: 100}
      ),
      'bid amount is too low'
    );
    await time.increase(7 * 86400 + 1); 
    await expectRevert(
      market.createBid(
        nft721.address,
        1,
        {from: buyer1, value: web3.utils.toWei('2')}
      ),
      'auction is finished'
    );
  });

  it('should create bid', async () => {
    const balanceBuyer1Before = await provider.getBalance(buyer1);
    const balanceBuyer2Before = await provider.getBalance(buyer2);
    await market.createBid(
      nft721.address,
      1,
      {from: buyer1, value: web3.utils.toWei('2')}
    );
    await market.createBid(
      nft.address,
      1,
      {from: buyer2, value: web3.utils.toWei('3')}
    );
    const balanceBuyer1 = await provider.getBalance(buyer1);
    const balanceBuyer2 = await provider.getBalance(buyer2);

    //trick to test a balance difference,
    //taking into consideration gas fees
    assert(balanceBuyer1.slice(0, 3) === '999'); //2 ether returned
    assert(balanceBuyer2.slice(0, 3) === '969'); //no ether returned
  });

  it('should do a full auction - auction failed', async () => {
    await time.increase(7 * 86400 + 1); 
    await market.closeBid(nft.address, 1);
    const tokenOwner = await nft.ownerOf(1);
    assert(tokenOwner === seller);
  });

  it('should do a full auction - auction succeeded', async () => {
    await market.createBid(
      nft.address,
      1,
      {from: buyer1, value: web3.utils.toWei('2')}
    );
    await market.createBid(
      nft.address,
      1,
      {from: buyer2, value: web3.utils.toWei('3')}
    );
    await market.createBid(
      nft.address,
      1,
      {from: buyer3, value: web3.utils.toWei('4')}
    );

    await time.increase(7 * 86400 + 1); 
    const balance1 = web3.utils.toBN(await provider.getBalance(seller));
    await market.closeBid(nft.address, 1);
    const tokenOwner = await nft.ownerOf(1);
    const balance2 = web3.utils.toBN(await provider.getBalance(seller));
    assert(tokenOwner === buyer3);
    assert(balance2.sub(balance1).toString() === web3.utils.toWei('4'));
  });
});