import {
  IonContent,
  IonHeader,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonPage,
} from "@ionic/react";
import "./Page.css";
import List from "./List";
import Course from "./Course";
import { pinyin } from "pinyin-pro";

const transFormPinyin = (name: string) => {
  return pinyin(name);
};

const list = [
  {
    name: "第一课",
    page: Course,
    slides: [
      {
        img: "/img/ni.png",
        audio: "/audio/ni3.mp3",
        voiceName: "你",
        gif: "/font/you.gif",
        example: () => (
          <>
            <div>
              <h1>你真漂亮。</h1>
              <div>{transFormPinyin("你真漂亮")}.</div>
              <div>You're really beautiful.</div>
            </div>
            <div>
              <h1>你多大？</h1>
              <div>{transFormPinyin("你多大")}?</div>
              <div>How old are you？</div>
            </div>
            <div>
              <h1>你叫什么名字？</h1>
              <div>{transFormPinyin("你叫什么名字")}?</div>
              <div>What is your name？</div>
            </div>
          </>
        ),
      },
      {
        img: "/img/hao.png",
        audio: "/audio/hao3.mp3",
        voiceName: "好",
        gif: "/font/hao.gif",
        example: () => (
          <>
            <div>
              <h1>好说。</h1>
              <div>{transFormPinyin("好说")}.</div>
              <div>to be fine, have no problem.</div>
            </div>
            <div>
              <h1>你真好。</h1>
              <div>{transFormPinyin("你真好")}.</div>
              <div>You are so kind.</div>
            </div>
            <div>
              <h1>好好生活。</h1>
              <div>{transFormPinyin("好好生活")}.</div>
              <div>Live a good life.</div>
            </div>
          </>
        ),
      },
    ],
  },
  {
    name: "第二课",
    page: Course,
    slides: [
      {
        img: "/img/nin.png",
        audio: "/audio/nin2.mp3",
        voiceName: "您",
        gif: "/font/nin.gif",
        example: () => (
          <>
            <div>
              <h1>您好。</h1>
              <div>{transFormPinyin("您好")}.</div>
              <div>Hello.</div>
            </div>
            <div>
              <h1>祝您好运。</h1>
              <div>{transFormPinyin("祝您好运")}.</div>
              <div>good luck.</div>
            </div>
            <div>
              <h1>您好，很高兴见到您。</h1>
              <div>{transFormPinyin("您好，很高兴见到您")}.</div>
              <div>Hello, nice to meet you.</div>
            </div>
          </>
        ),
      },
      {
        img: "/img/hao.png",
        audio: "/audio/hao3.mp3",
        voiceName: "好",
        gif: "/font/hao.gif",
        example: () => (
          <>
            <div>
              <h1>好说。</h1>
              <div>{transFormPinyin("好说")}.</div>
              <div>to be fine, have no problem.</div>
            </div>
            <div>
              <h1>您真好。</h1>
              <div>{transFormPinyin("您真好")}.</div>
              <div>You are very kind.</div>
            </div>
            <div>
              <h1>好好生活。</h1>
              <div>{transFormPinyin("好好生活")}.</div>
              <div>Live a good life.</div>
            </div>
          </>
        ),
      },
    ],
  },
  {
    name: "第三课",
    page: Course,
    slides: [
      {
        img: "/img/zai.png",
        audio: "/audio/zai4.mp3",
        voiceName: "再",
        gif: "/font/zai.gif",
        example: () => (
          <>
            <div>
              <h1>再见。</h1>
              <div>{transFormPinyin("再见")}.</div>
              <div>Goodbye.</div>
            </div>
            <div>
              <h1>欢迎再次光临！</h1>
              <div>{transFormPinyin("欢迎再次光临")}!</div>
              <div>Welcome back!</div>
            </div>
            <div>
              <h1>请再说一遍。</h1>
              <div>{transFormPinyin("请再说一遍")}.</div>
              <div>Please say it again.</div>
            </div>
          </>
        ),
      },
      {
        img: "/img/jian.png",
        audio: "/audio/jian4.mp3",
        voiceName: "见",
        gif: "/font/jian.gif",
        example: () => (
          <>
            <div>
              <h1>见面。</h1>
              <div>{transFormPinyin("见面")}.</div>
              <div>meet.</div>
            </div>
            <div>
              <h1>明天见。</h1>
              <div>{transFormPinyin("明天见")}.</div>
              <div>See you tomorrow.</div>
            </div>
            <div>
              <h1>我看见了她。</h1>
              <div>{transFormPinyin("我看见了她")}.</div>
              <div>I saw her.</div>
            </div>
          </>
        ),
      },
    ],
  },
];

const Page: React.FC<IProps> = ({ title, slides }) => {
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
      <IonContent id="page-content-warp" class="ion-padding">
        <div className="page-content">{<List list={list}></List>}</div>
      </IonContent>
    </>
  );
};

export interface IProps {
  title: string;
  slides: object[];
}

export default Page;
