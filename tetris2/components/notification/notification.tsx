import style from './notification.module.scss';

function Notification({ text }: { text: string }) {
  return (
    <>
      <div className={style.notification_background} />
      <div className={style.notification}>{text}</div>
    </>
  );
}

export default Notification;
