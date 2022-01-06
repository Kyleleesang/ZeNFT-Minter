// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
//imports from the lazy minting guide
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


//ZeNFT implementation for ERC721's
abstract contract ZNFT is Initializable, ERC721Upgradeable, EIP712Upgradeable, ERC721URIStorageUpgradeable, PausableUpgradeable, AccessControlUpgradeable, ERC721BurnableUpgradeable, UUPSUpgradeable {
    //lazy minter stuff
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("DEFAULT_ADMIN_ROLE");
    string private constant SIGNING_DOMAIN = "ZeNFT-Minter";
    string private constant SIGNATURE_VERSION = "1.0";
    //royalties
    address public artist;
    address public txFeeToken;
    uint public txFeeAmount;
    mapping(address => bool) public excludedList;
    using CountersUpgradeable for CountersUpgradeable.Counter;
    mapping (address => uint256) pendingWithdrawals;

    CountersUpgradeable.Counter private _tokenIdCounter;
    constructor() initializer {}

    function initialize(address payable minter) initializer public {
        __ERC721_init("zNFT", "Zens");
        __EIP712_init("ZeNFT", "1.0");
        __ERC721URIStorage_init();
        __Pausable_init();
        __ERC721Burnable_init();
        __UUPSUpgradeable_init();
        __AccessControl_init();

        _setupRole(MINTER_ROLE, minter);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(PAUSER_ROLE, msg.sender);
    }
        
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function safeMint(address to, string memory uri) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal whenNotPaused override{
        super._beforeTokenTransfer(from, to, tokenId);
    }
//Only the owner can call this function in which you pass in the contract address of the newly deployed contract
//called the new Implementation
    function _authorizeUpgrade(address newImplementation)internal onlyRole(DEFAULT_ADMIN_ROLE) override{
        }
    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721Upgradeable, ERC721URIStorageUpgradeable){
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)public view override(ERC721Upgradeable, ERC721URIStorageUpgradeable) returns (string memory){
        return super.tokenURI(tokenId);
    }
  //here starts the lazy minting
  //if you are doing an airdrop then you have to take the minimum price out of it and then the buyer pays the gas fees
  ///Represents an un-minted NFT, which has not yet been recorded into the blockchain. A signed voucher can be redeemed for a real NFT using the redeem function.
  struct NFTVoucher {
    // The id of the token to be redeemed. Must be unique - if another token with this ID already exists, the redeem function will revert.
    uint256 tokenId;
    //The minimum price (in wei) that the NFT creator is willing to accept for the initial sale of this NFT.
    uint256 minPrice;
    //The metadata URI to associate with this token.
    string uri;
    //the EIP-712 signature of all other fields in the NFTVoucher struct. For a voucher to be valid, it must be signed by an account with the MINTER_ROLE.
    bytes signature;
  }
  /// notice Redeems an NFTVoucher for an actual NFT, creating it in the process.
  /// param redeemer The address of the account which will receive the NFT upon success.
  /// param voucher A signed NFTVoucher that describes the NFT to be redeemed.
  function redeem(address redeemer, NFTVoucher calldata voucher) public payable returns (uint256) {
    // make sure signature is valid and get the address of the signer
    address signer = _verify(voucher);
    // make sure that the signer is authorized to mint NFTs
    //hasRole
    require(hasRole(MINTER_ROLE, signer), "Signature invalid or unauthorized");
    // make sure that the redeemer is paying enough to cover the buyer's cost
    require(msg.value >= voucher.minPrice, "Insufficient funds to redeem");
    // first assign the token to the signer, to establish provenance on-chain
    _mint(signer, voucher.tokenId);
    _setTokenURI(voucher.tokenId, voucher.uri);
    // transfer the token to the redeemer
    _transfer(signer, redeemer, voucher.tokenId);
    // record payment to signer's withdrawal balance
    pendingWithdrawals[signer] += msg.value;
    return voucher.tokenId;
  }

  /// notice Transfers all pending withdrawal balance to the caller. Reverts if the caller is not an authorized minter.
  function withdraw() public {
    //hasRole
    require(hasRole(MINTER_ROLE, msg.sender), "Only authorized minters can withdraw");
    // IMPORTANT: casting msg.sender to a payable address is only safe if ALL members of the minter role are payable addresses.
    address payable receiver = payable(msg.sender);
    uint amount = pendingWithdrawals[receiver];
    // zero account before transfer to prevent re-entrancy attack
    pendingWithdrawals[receiver] = 0;
    receiver.transfer(amount);
  }

  /// notice Retuns the amount of Ether available to the caller to withdraw.
  function availableToWithdraw() public view returns (uint256) {
    return pendingWithdrawals[msg.sender];
  }

  /// @notice Returns a hash of the given NFTVoucher, prepared using EIP712 typed data hashing rules.
  /// @param voucher An NFTVoucher to hash.
  function _hash(NFTVoucher calldata voucher) internal view returns (bytes32) {
    return _hashTypedDataV4(keccak256(abi.encode(
      keccak256("NFTVoucher(uint256 tokenId,uint256 minPrice,string uri)"),
      voucher.tokenId,
      voucher.minPrice,
      keccak256(bytes(voucher.uri))
    )));
  }

  /// notice Returns the chain id of the current blockchain.
  /// @dev This is used to workaround an issue with ganache returning different values from the on-chain chainid() function and
  ///  the eth_chainId RPC method. See https://github.com/protocol/nft-website/issues/121 for context.
  function getChainID() external view returns (uint256) {
    uint256 id;
    assembly {
        id := chainid()
    }
    return id;
  }
  /// notice Verifies the signature for a given NFTVoucher, returning the address of the signer.
  /// dev Will revert if the signature is invalid. Does not verify that the signer is authorized to mint NFTs.
  /// param voucher An NFTVoucher describing an unminted NFT.
  function _verify(NFTVoucher calldata voucher) internal view returns (address) {
    bytes32 digest = _hash(voucher);
    return ECDSA.recover(digest, voucher.signature);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override (AccessControlUpgradeable, ERC721Upgradeable) returns (bool) {
    return ERC721Upgradeable.supportsInterface(interfaceId) || AccessControlUpgradeable.supportsInterface(interfaceId);
  }
//sets whether its excluded from paying royalties
  function setExcluded(address excluded, bool status) external {
    require(msg.sender == artist, 'artist only');
    excludedList[excluded] = status;
  }

  function transferFrom(address from, address to, uint256 tokenId) public override {
     require(ownerOf(tokenId) == msg.sender, 'ERC721: transfer caller is not owner nor approved');
     _transfer(from, to, tokenId);
  }
// this should require an is approvedorOwner?
  function safeTransferFrom(address from, address to, uint256 tokenId) public override  {
     safeTransferFrom(from, to, tokenId, '');
   }
//look up to see why theres a seperate transferFrom adding in the bytes
  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
    require(ownerOf(tokenId) == msg.sender, 'ERC721: transfer caller is not owner nor approved');
    _safeTransfer(from, to, tokenId, _data);
  }
}

