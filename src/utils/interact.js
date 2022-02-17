import {pinJSONToIPFS} from './pinata.js'
import React, { Component }  from 'react';
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const ethers = ethers.providers.AlchemyProvider("Ropsten" , alchemyKey);
const contractABI = require('./zNFT-ABI.json')
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
// takes in json name and description, json is supposed to have the image in it
// and json with image in it gets uploaded with pinJSONToIPFS
export const mintNFT = async(image, name, description) => {
    //error handling if one of  them is missing
  if (image.trim() == "" || (name.trim() == "" || description.trim() == "")) { 
      return {success: false, status: "❗Please make sure all fields are completed before minting.",}
    }
    //make the JSON and then send it straight to Pinata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = image;
    metadata.description = description;
    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
      return {success: false,status: "😢 Something went wrong while uploading your tokenURI.",}
    } //the token URI is the return type of the pinataresponse
    const tokenURI = pinataResponse.pinataUrl;  
    //load smart contract
    window.contract = await new ethers.Contract(contractAddress, contractABI, ethers);//loadContract();
    //set up your Ethereum transaction
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.safeMint(window.ethereum.selectedAddress, tokenURI).encodeABI() //make call to NFT smart contract 
    };
    //sign transaction via Metamask
    try {const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],});
        return {
            success: true,
            status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }
}