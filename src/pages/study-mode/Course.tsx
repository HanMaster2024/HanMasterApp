import {
  IonContent,
  IonHeader,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as swiper } from "swiper";
import "swiper/css";
import { volumeHighOutline, volumeHigh } from "ionicons/icons";
import "./Course.css";
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Stage, Layer, Line, Rect, Image } from "react-konva";
import useImage from "use-image";
import { pinyin } from "pinyin-pro";

type Slide = {
  img: string;
  audio: string;
  voiceName: string;
  gif: string;
  example: React.FC;
};

export interface IProps {
  title: string;
  slides: Slide[];
}

let swiperContext: swiper | null = null;

// 画布
const SquareWithGrid = ({ img }) => {
  const [lines, setLines] = useState([]);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const isDrawing = React.useRef(false);
  const stageSize = Math.min(dimensions.width, dimensions.height) - 32;
  const squareSize = stageSize;
  const padding = (stageSize - squareSize) / 2;
  const strokeWidth = 1;

  const handleMouseDown = (e) => {
    if (swiperContext) {
      swiperContext.allowSlideNext = false;
      swiperContext.allowSlidePrev = false;
    }
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
    lastLine.points = [...lastLine.points, point.x, point.y];

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    if (swiperContext) {
      swiperContext.allowSlideNext = true;
      swiperContext.allowSlidePrev = true;
    }
    isDrawing.current = false;
  };

  const stageRef = useRef(null);
  const [image] = useImage(img);

  // Handle window resizing
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [image]);

  // const DrawLine = () => {
  //   /* Draw a 米 character inside the square */
  //   return (
  //     <>
  //       <Line
  //         points={[
  //           padding,
  //           padding,
  //           padding + squareSize,
  //           padding + squareSize,
  //         ]}
  //         stroke="#000"
  //         strokeWidth={strokeWidth}
  //       />
  //       <Line
  //         points={[
  //           padding + squareSize,
  //           padding,
  //           padding,
  //           padding + squareSize,
  //         ]}
  //         stroke="#000"
  //         strokeWidth={strokeWidth}
  //       />
  //       <Line
  //         points={[
  //           padding,
  //           padding + squareSize / 2,
  //           padding + squareSize,
  //           padding + squareSize / 2,
  //         ]}
  //         stroke="#000"
  //         strokeWidth={strokeWidth}
  //       />
  //       <Line
  //         points={[
  //           padding + squareSize / 2,
  //           padding,
  //           padding + squareSize / 2,
  //           padding + squareSize,
  //         ]}
  //         stroke="#000"
  //         strokeWidth={strokeWidth}
  //       />
  //     </>
  //   );
  // };

  return (
    <Stage
      ref={stageRef}
      width={stageSize}
      height={stageSize}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <Layer>
        <Image
          image={image} // 替换为你的背景图
          width={stageSize} // 设置图片宽度与画布宽度相同
          height={stageSize} // 设置图片高度与画布高度相同
        />
        {/* Draw a square */}
        <Rect
          x={padding}
          y={padding}
          width={squareSize}
          height={squareSize}
          stroke="#686868"
          strokeWidth={3}
        />

        {/* Draw a 米 character inside the square */}
        {/* <DrawLine /> */}

        {/* Draw the lines */}
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="black"
            strokeWidth={line.lineWidth || 8} // Use line.lineWidth if available
            tension={0.5}
            lineCap="round"
            globalCompositeOperation="source-over"
          />
        ))}
      </Layer>
    </Stage>
  );
};

const Page: React.FC<IProps> = ({ title, slides }) => {
  useEffect(() => {
    // 此函数将在组件首次渲染时调用
    playAudio(0);
    // 您可以在这里执行其他初始化逻辑
  }, []);

  // 创建一个数组来存储所有元素的 ref
  const audioRefs = slides.map(() => useRef<HTMLAudioElement | null>(null));
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (index: number) => {
    const audio = audioRefs[index].current;
    console.log(audioRefs, audioRefs[index]);
    if (audio && typeof audio.play === "function") {
      setIsPlaying(true);
      audio.play();
      setTimeout(() => {
        setIsPlaying(false);
      }, 1200);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar className="toolbar-title ">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="course" class="ion-padding">
        {/* <Swiper allowSlideNext={allowSlideNext} allowSlidePrev={allowSlidePrev}> */}
        <Swiper
          onSwiper={(swipeInstance) => {
            swiperContext = swipeInstance;
          }}
        >
          {slides.map((slide: Slide, index: number) => (
            <SwiperSlide key={index}>
              <div className="content-wrap">
                <SquareWithGrid key={index} img={slide.img} />
                <div className="voice-wrap">
                  <span className="voice">
                    <div
                      onClick={() => playAudio(index)}
                      className="voice_icon"
                    >
                      <IonIcon
                        icon={isPlaying ? volumeHigh : volumeHighOutline}
                        size="large"
                      ></IonIcon>
                      <audio
                        hidden
                        ref={audioRefs[index]}
                        src={slide.audio}
                      ></audio>
                      <div className="voice_pinyin">
                        {pinyin(slide.voiceName)}
                      </div>
                    </div>
                  </span>
                  <img src={slide.gif} alt="" width="60" />
                </div>
                <div className="example">
                  <slide.example />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </IonContent>
    </>
  );
};

export default Page;
