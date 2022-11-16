import {
  keyStores,
  Near,
  Contract,
  WalletConnection,
  utils as nearUtils,
} from "near-api-js";

export const CONTRACT_NAME = process.env.CONTRACT_NAME || "new-awesome-project";

// replace the CONTRACT_ID with the account where you have deployed your smart contract
export const CONTRACT_ID = "dev-1668523425541-30692929149368";

export const initNear = async () => {
  //Testnet config
  const near = new Near({
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
  });

  //Wallet init
  wallet = new WalletConnection(near, "Near Dapp");
  // contract init
  contract = new Contract(wallet.account(), CONTRACT_ID, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ["view_function"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ["chnage_function"],
  });
};

//Loaded after the being server to the client
//Due to keystore needing access to the window object
export let wallet = null;
export let contract = null;
export const utils = nearUtils;

//Methods

export const signIn = () => {
  wallet.requestSignIn(CONTRACT_ID);
};

export const signOut = () => {
  wallet.signOut();
};

//Function for view methods
// Add the function as a view method to viewMethods line 28
export async function view_function() {
  let result = await contract.view_function();
  return result;
}

//Function for call method passing arguments in this example 'name'
// Add the function as a change method to changeMethods line 30
export async function chnage_function(name) {
  let result = await contract.chnage_function({
    name: name,
  });
  return result;
}
