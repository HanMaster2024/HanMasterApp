import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import "./Tab2.css";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonMenu,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRange,
} from "@ionic/react";
import { menuController } from "@ionic/core/components";

const DrawingCanvas = forwardRef(({ lineWidth }, ref) => {
  const [lines, setLines] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - 32,
    height: window.innerHeight - 200,
  });
  const isDrawing = useRef(false);

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth - 32,
        height: window.innerHeight - 200,
      });
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useImperativeHandle(ref, () => ({
    clear() {
      setLines([]);
    },
  }));

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], lineWidth }]);
  };

  const handleMouseMove = (e) => {
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
            stroke="black"
            strokeWidth={line.lineWidth || 5} // Use line.lineWidth if available
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

  async function openFirstMenu() {
    await menuController.open("first-menu");
  }

  async function openSecondMenu() {
    await menuController.open("second-menu");
  }

  async function openEndMenu() {
    await menuController.open("end");
  }

  function clearCanvas() {
    canvasRef.current.clear();
  }

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar className="toolbar-title">
          <IonTitle>创作模式</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonMenu menuId="first-menu" contentId="main-content">
        <IonToolbar className="toolbar-title">
          <IonTitle>First Menu</IonTitle>
        </IonToolbar>

        <IonContent className="ion-padding">
          {/* Slider to adjust line width */}
          <IonRange
            min={1}
            max={10}
            step={1}
            value={lineWidth}
            onIonChange={(e) => setLineWidth(e.detail.value)}
            pin={true}
          >
            <IonTitle size="small">线条粗细: {lineWidth}</IonTitle>
          </IonRange>
        </IonContent>
      </IonMenu>
      <IonMenu menuId="second-menu" contentId="main-content">
        <IonToolbar>
          <IonTitle>Second Menu</IonTitle>
        </IonToolbar>

        <IonContent className="ion-padding">
          This is the second menu content.
        </IonContent>
      </IonMenu>

      <IonMenu menuId="end" contentId="main-content">
        <IonToolbar>
          <IonTitle>End Menu</IonTitle>
        </IonToolbar>

        <IonContent className="ion-padding">
          This is the end menu content.
        </IonContent>
      </IonMenu>

      <IonContent className="ion-padding">
        <DrawingCanvas ref={canvasRef} lineWidth={lineWidth} />
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
  );
}

export default Tab2;
