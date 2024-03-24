import React, { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import './Tab2.css';
import {
  IonButton, IonContent, IonFooter, IonHeader,
  IonMenu, IonPage, IonTitle, IonToolbar
} from '@ionic/react';
import { menuController } from '@ionic/core/components';

function DrawingCanvas() {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="#df4b26"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            globalCompositeOperation="source-over"
          />
        ))}
      </Layer>
    </Stage>
  );
}



function Tab2() {
  const canvasRef = useRef(null);

  async function openFirstMenu() {
    await menuController.open('first-menu');
  }

  async function openSecondMenu() {
    await menuController.open('second-menu');
  }

  async function openEndMenu() {
    await menuController.open('end');
  }

  return (
    <>
      <IonMenu menuId="first-menu" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>First Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the first menu content.</IonContent>
      </IonMenu>

      <IonMenu menuId="second-menu" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Second Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the second menu content.</IonContent>
      </IonMenu>

      <IonMenu menuId="end" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>End Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the end menu content.</IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>创作模式</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <DrawingCanvas />
        </IonContent>
        <IonFooter>
          <div className="button-group">
            <IonButton expand="block" onClick={openFirstMenu}>
              画笔工具
            </IonButton>
            <IonButton expand="block" onClick={openSecondMenu}>
              画布工具
            </IonButton>
            <IonButton expand="block" onClick={openEndMenu}>
              Open End Menu
            </IonButton>
          </div>
        </IonFooter>
      </IonPage>
    </>
  );
}

export default Tab2;
