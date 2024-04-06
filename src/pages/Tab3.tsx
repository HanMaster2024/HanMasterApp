import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonNavLink,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import Wallet from "./wallet-connection/index";
import "./Tab3.css";

const Tab3: React.FC = () => {
  return (
    <IonPage id="my">
      <IonHeader>
        <IonToolbar className="toolbar-title">
          <IonTitle>我的</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Han Master</IonCardTitle>
            <IonCardSubtitle>Personal Information</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Learn Chinese! Write Calligraphy! And Make Money!
          </IonCardContent>
        </IonCard>
        <IonList>
          <IonItem>
            <IonNavLink routerDirection="forward" component={() => <Wallet />}>
              <IonLabel>基础信息设置</IonLabel>
            </IonNavLink>
          </IonItem>
          <IonItem>
            <IonNavLink routerDirection="forward" component={() => <Wallet />}>
              <IonLabel>学习数据统计</IonLabel>
            </IonNavLink>
          </IonItem>
          <IonItem>
            <IonNavLink routerDirection="forward" component={() => <Wallet />}>
              <IonLabel>上架作品统计</IonLabel>
            </IonNavLink>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
