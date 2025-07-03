import { useContext } from "react";
import { NotificationContext } from "../../context/notificationContext";
import styles from "./Notification.module.scss";
const Notification: React.FC = () => {
  const notificationContext = useContext(NotificationContext);

  return (
    <>
      {notificationContext && notificationContext.notifications.id && (
        <div
          className={[styles.notification, styles[notificationContext.notifications.type]].join(" ")}
        >
          <p className={styles.title}>Notification</p>
          <p>{notificationContext.notifications.message}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
