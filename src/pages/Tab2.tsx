import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import './Tab2.css';
import {
  IonButton, IonContent, IonFooter, IonHeader,
  IonMenu, IonPage, IonTitle, IonToolbar, IonRange, IonItem, IonLabel
} from '@ionic/react';
import { menuController } from '@ionic/core/components';


interface DrawingCanvasProps {
  lineWidth: any;
  lineColor: any;
}

interface DrawingCanvasRef {
  clear(): void;
}



const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({ lineWidth, lineColor }, ref) => {
  const [lines, setLines] = useState<{ points: number[], lineWidth: any, color: any }[]>([]);

  const [dimensions, setDimensions] = useState({ width: window.innerWidth * 0.98, height: window.innerHeight - 180 });
  const isDrawing = useRef(false);



  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth * 0.98,
        height: window.innerHeight - 180
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useImperativeHandle(ref, () => ({
    clear() {
      setLines([]);
    }
  }));

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], lineWidth, color: lineColor }]);
  };


  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // Ensure the last line includes the lineWidth for new points
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lastLine.lineWidth = lineWidth; // Update lineWidth based on the slider
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };


  
  return (
    <Stage
      width={dimensions.width}
      height={dimensions.height}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          width={dimensions.width}
          height={dimensions.height}
          fill="#f0f0f0"
        />
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={line.color} // 使用每条线自己的颜色
            strokeWidth={line.lineWidth || 5}
            tension={0.5}
            lineCap="round"
            globalCompositeOperation="source-over"
          />
        ))}

      </Layer>
    </Stage>
  );
});

function Tab2() {
  const canvasRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(5); // Default line width
  const [lineColor, setLineColor] = useState('#000000'); // Default line color is black

  const [isEraserActive, setIsEraserActive] = useState(false); // Default is false

  async function openFirstMenu() {
    await menuController.open('first-menu');
  }

  async function openSecondMenu() {
    await menuController.open('second-menu');
  }

  async function openEndMenu() {
    await menuController.open('end');
  }

  function clearCanvas() {
    (canvasRef.current as any)?.clear();
  }


  return (
    <>
      <IonMenu menuId="first-menu" contentId="main-content">
      <IonButton expand="block" onClick={() => setIsEraserActive(!isEraserActive)}>
  {isEraserActive ? '使用画笔' : '使用橡皮擦'}
</IonButton>

        <IonHeader>
          <IonToolbar>
            <IonTitle>画笔工具</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {/* Text to display line width */}

          {/* Slider to adjust line width */}
          <IonLabel position="stacked">线条粗细</IonLabel>
          <IonRange
            min={1}
            max={20}
            step={1}
            value={lineWidth}
            onIonChange={e => setLineWidth(e.detail.value as number)}
            pin={true}
          ></IonRange>


          {/* Input for custom color selection */}

          <IonLabel position="stacked">线条颜色</IonLabel>
          <input type="color" value={lineColor} onChange={e => setLineColor(e.target.value)} />

        </IonContent>
      </IonMenu>


      <IonMenu menuId="second-menu" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>画布工具</IonTitle>
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
        <DrawingCanvas ref={canvasRef} lineWidth={lineWidth} lineColor={isEraserActive ? '#f0f0f0' : lineColor} />

        </IonContent>
        <IonFooter>
          <div className="button-group">
            <IonButton expand="block" onClick={openFirstMenu}>
              画笔工具
            </IonButton>
            <IonButton expand="block" onClick={openSecondMenu}>
              画布工具
            </IonButton>
            <IonButton expand="block" onClick={clearCanvas}>
              清空画布
            </IonButton>
          </div>
        </IonFooter>
      </IonPage>
    </>
  );
}

export default Tab2;
