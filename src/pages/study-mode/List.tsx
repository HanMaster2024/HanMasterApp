import { IonNavLink, IonIcon } from "@ionic/react";
import { folder } from "ionicons/icons";
import { IProps } from "./Page";

interface ListItem {
  name: string;
  page: React.FC<IProps>;
  slides: object[];
}

interface ListProps {
  list: ListItem[];
}

const List: React.FC<ListProps> = ({ list }) => {
  return (
    <>
      {list.map((item, index) => {
        return (
          <IonNavLink
            key={index}
            className="list-box"
            routerDirection="forward"
            component={() => (
              <item.page title={item.name} slides={item.slides} />
            )}
          >
            <IonIcon icon={folder} size="large"></IonIcon>
            {/* <img src="/img/folder.svg" /> */}
            {item.name}
          </IonNavLink>
        );
      })}
    </>
  );
};

export default List;
