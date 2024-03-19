import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Web3 from 'web3'

const Tab1: React.FC = () => {
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  console.log(web3)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>学习模式</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">学习模式</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="学习模式" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
