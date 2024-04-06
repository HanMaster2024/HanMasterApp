import {
  IonContent,
  IonHeader,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { useState } from "react";
import Web3 from "web3";

const connectWallet: React.FC = () => {
  const [connectedAccount, setConnectedAccount] = useState("null");

  async function connectMetamask() {
    //check metamask is installed
    if (window.ethereum) {
      console.log(window.ethereum);
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();

      //show the first connected account in the react page
      setConnectedAccount(accounts[0]);
    } else {
      alert("Please download metamask");
    }
  }

  return (
    <>
      <IonHeader>
        <IonToolbar className="toolbar-title ">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>wallet connection</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="page-content-warp" class="ion-padding">
        {/* Button to trigger Metamask connection */}
        <IonButton onClick={() => connectMetamask()}>
          Connect to wallet
        </IonButton>

        {/* Display the connected account */}
        <h2>{connectedAccount}</h2>
      </IonContent>
    </>
  );
};

export default connectWallet;
