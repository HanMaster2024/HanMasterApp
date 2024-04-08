import {
  IonContent,
  IonHeader,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  useIonLoading,
} from "@ionic/react";
import { useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
// import contractABI from "./ContractABI.json";

const connectWallet: React.FC = () => {
  const [present, dismiss] = useIonLoading();
  const [connectedAccount, setConnectedAccount] = useState("null");

  async function connectContract() {
    present({
      message: "Connecting ...",
    });

    try {
      const connection = new Connection("https://api.devnet.solana.com");
      const contractAddress = "9JjymTUKnDM91mAx3g75yvMkxW8udrx16AfVkmRwjNjJ";

      // 获取合约信息
      const contractInfo = await connection.getAccountInfo(
        new PublicKey(contractAddress)
      );

      if (contractInfo) {
        console.log("Successfully connected to contract:", contractAddress);
        console.log(contractInfo);
        setConnectedAccount(contractInfo);
        dismiss();
        // 在此处可以执行其他逻辑，例如获取合约的其他信息
      } else {
        dismiss();
        console.error("Failed to connect to contract:", contractAddress);
      }
    } catch (error) {
      dismiss();
      console.error("Error connecting to contract:", error);
    }
  }

  return (
    <>
      <IonHeader>
        <IonToolbar className="toolbar-title ">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>contract connection</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="page-content-warp" class="ion-padding">
        <IonButton onClick={() => connectContract()}>
          Connect to contract
        </IonButton>

        {/* Display the connected account */}
        <h2>{JSON.stringify(connectedAccount)}</h2>
      </IonContent>
    </>
  );
};

export default connectWallet;
