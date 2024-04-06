// DrawingModal.tsx
import React from 'react';
import { IonModal, IonButton, IonContent, IonImg } from '@ionic/react';

const DrawingModal: React.FC<{ imageUrl: string; isOpen: boolean; onClose: () => void; }> = ({ imageUrl, isOpen, onClose }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent>
        <IonImg src={imageUrl} />
        <IonButton onClick={onClose}>关闭</IonButton>
      </IonContent>
    </IonModal>
  );
};


export default DrawingModal;
