import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonList,
  IonProgressBar,
  IonNavLink,
} from "@ionic/react";
// import ExploreContainer from '../components/ExploreContainer';
import "./Tab1.css";
import Page from "./study-mode/Page";
import List from "./study-mode/List";

const list = [
  {
    name: "初心者工坊",
    page: Page,
  },
  {
    name: "突破工坊",
    page: Page,
  },
  {
    name: "智慧之门",
    page: Page,
  },
  {
    name: "技能堂",
    page: Page,
  },
  {
    name: "古诗词探索",
    page: Page,
  },
  {
    name: "诗歌精进",
    page: Page,
  },
  {
    name: "探索之旅",
    page: Page,
  },
];

const Tab1: React.FC = () => {
  return (
    <IonPage id="study-mode">
      <IonHeader>
        <IonToolbar className="toolbar-title ">
          <IonTitle>Han Master</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="list-content-wrap">
        <IonText color="primary">
          <h1>今日博学</h1>
        </IonText>
        <IonList>
          <div className="list-header-wrap">
            <div className="list-header">
              <div className="list-header-content">
                <span className="list-header-content-title">6</span>
                <IonProgressBar color="warning" value={0.2}></IonProgressBar>
                <span>今日学习字数</span>
              </div>
              <div className="list-header-content">
                <span className="list-header-content-title">15m</span>
                <IonProgressBar color="warning" value={0.2}></IonProgressBar>
                <span>今日学习时长</span>
              </div>
            </div>
          </div>
          <div className="list-content">{<List list={list}></List>}</div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
