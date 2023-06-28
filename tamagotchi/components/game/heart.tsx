import classes from './tamagotchi.module.scss';

type styleType = {
  color: string;
  healthPoints: number;
};

const heart = (style: styleType) => (
  <div className={classes.heart} style={{ marginTop: '1vh' }}>
    <p style={{ margin: '1vh 0 0 -0.25vw', position: 'absolute', color: 'white' }}>
      {style.healthPoints}
    </p>
    <svg width="3.6vw" height="6.4vh" fill={style.color} viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </svg>
  </div>
);

export default heart;
