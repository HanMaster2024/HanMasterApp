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
  IonImg,
  IonThumbnail,
  IonButtons,
  IonButton,
  useIonModal,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import React, { useState } from "react";

import Wallet from "./wallet-connection/index";
import "./Tab3.css";
// import DrawingModal from "../components/DrawingModal";
import { useHistory } from "react-router-dom";

const Tab3: React.FC = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const savedDrawings = JSON.parse(
    localStorage.getItem("savedDrawings") || "[]"
  );

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    // setIsModalOpen(true);
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
    });
  };

  // const closeModal = () => {
  //   console.log("Closing modal");
  //   setIsModalOpen(false);
  //   // history.push('/tab3'); // 将导航放在关闭逻辑之后
  // };

  const DrawingModal = ({
    imageUrl,
    onDismiss,
  }: {
    imageUrl: string;
    onDismiss: () => void;
  }) => {
    return (
      <>
        {" "}
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonContent>
          <IonImg src={imageUrl} />
        </IonContent>
      </>
    );
  };

  const [present, dismiss] = useIonModal(DrawingModal, {
    imageUrl: selectedImage,
    isOpen: isModalOpen,
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

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

        {savedDrawings.map((imageURL: string, index: number) => (
          <IonItem key={index} button onClick={() => openModal(imageURL)}>
            <IonThumbnail slot="start">
              <IonImg src={imageURL} />
            </IonThumbnail>
            <IonLabel>作品 {index + 1}</IonLabel>
          </IonItem>
        ))}
        {/* <DrawingModal
          trigger='open-modal'
          imageUrl={selectedImage}
          isOpen={isModalOpen}
          onClose={closeModal}
        /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
