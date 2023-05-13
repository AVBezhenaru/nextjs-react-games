type styleType = {
  color: string;
  healthPoints: number;
};

const heart = (style: styleType) => (
  <div className="heart" style={{ marginTop: '15px' }}>
    <p style={{ margin: '15px 0 0 25px', position: 'absolute', color: 'white' }}>
      {style.healthPoints}
    </p>
    <svg width="70" height="70" fill={style.color} viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </svg>
  </div>
);

export default heart;
