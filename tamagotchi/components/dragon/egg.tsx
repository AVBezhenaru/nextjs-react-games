import { useState } from 'react';

import classes from './dragon.module.scss';

const initClassEgg = {
  egg: classes.eggAnimate,
  leftHalf: classes.leftHalf,
  rightHalf: classes.rightHalf,
};

const animateClassEgg = {
  egg: classes.egg,
  leftHalf: classes.leftHalfAnimate,
  rightHalf: classes.rightHalfAnimate,
};

const Egg = () => {
  const [isBorn, setBorn] = useState(initClassEgg);
  return (
    <div className={isBorn.egg} onClick={() => setBorn(animateClassEgg)}>
      <svg
        width="42.7vw"
        height="20.4vh"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 98.15 131.68"
      >
        <title>egg</title>
        <g id="lay_2" data-name="lay 2">
          <g id="lay_1-2" data-name="lay 1">
            <g className={isBorn.leftHalf}>
              <path
                fill="#910000"
                d="M39.15,102.49l9.86,21-6,7.9c-29.94-3.15-43-30-43-60.78C0,37.74,26.24,0,49.07,0a23,23,0,0,1,4.34.43L37.89,12.3l8.34,3.79-5.06,7.58,13.9,14.65L45,55.5,52.29,58,50,65.1l13.89,5.56L43.7,90.87l3,10.86Z"
              />
              <path
                fill="#df3200"
                d="M39.15,102.49l9.86,21-2.35,3.09c-31.45-.39-45.07-27.06-45.07-58,0-31.18,24.48-67,45.78-67a20.33,20.33,0,0,1,4.08.42L37.89,12.3l8.34,3.79-5.06,7.58,13.9,14.65L45,55.5,52.29,58,50,65.1l13.89,5.56L43.7,90.87l3,10.86Z"
              />
              <path
                fill="#ff1f1f"
                d="M46.73,101.73l-7.58.76,4.61,9.81c-.92.06-1.87.09-2.83.09-26.45,0-37.9-22.22-37.9-48S23.29,8.87,40.93,8.87c.45,0,.9,0,1.36.06l-4.4,3.37,8.34,3.79-5.06,7.58,13.9,14.65L45,55.5,52.29,58,50,65.1l13.89,5.56L43.7,90.87Z"
              />
              <path
                fill="#f44"
                d="M25.64,20.21c4.3-3.79,8.34-4.55,10.11-4.3s5,4-.51,12.89S19.07,49,19.33,67.2s-5.56,19.7-8.85,18.19-8.08-24.26.26-41.94S25.64,20.21,25.64,20.21Z"
              />
              <path
                fill="#f44"
                d="M40.64,89c-1.87,9.16-5.06,16.1-12,14.67s-11.11-10-9.24-19.16,9-15.43,16-14S42.51,79.79,40.64,89Z"
              />
              <ellipse
                fill="#ff751b"
                cx="30.81"
                cy="32.85"
                rx="8.35"
                ry="6.53"
                transform="translate(-9.81 52.31) rotate(-72.43)"
              />
              <ellipse
                fill="#ff751b"
                cx="34.18"
                cy="57.72"
                rx="10.6"
                ry="8.29"
                transform="translate(-29.87 77.64) rotate(-76.64)"
              />
              <ellipse
                fill="#ff751b"
                cx="21.28"
                cy="107.08"
                rx="4.03"
                ry="5.15"
                transform="translate(-24.89 8.15) rotate(-13.78)"
              />
              <ellipse
                fill="#ff5e1f"
                cx="37.7"
                cy="119.52"
                rx="3.13"
                ry="4"
                transform="matrix(0.99, -0.16, 0.16, 0.99, -18.44, 7.47)"
              />
              <ellipse
                fill="#ff751b"
                cx="17.87"
                cy="39.06"
                rx="4"
                ry="3.13"
                transform="translate(-24.69 44.86) rotate(-73.19)"
              />
              <ellipse
                fill="#ffdf68"
                cx="25.47"
                cy="31.46"
                rx="2.51"
                ry="1.96"
                transform="matrix(0.29, -0.96, 0.96, 0.29, -12.01, 46.75)"
              />
              <ellipse
                fill="#ffdf68"
                cx="23.1"
                cy="67.08"
                rx="2.51"
                ry="1.96"
                transform="translate(-47.8 69.8) rotate(-73.19)"
              />
              <ellipse
                fill="#ffdf68"
                cx="10.16"
                cy="43.17"
                rx="1.85"
                ry="1.3"
                transform="matrix(0.29, -0.96, 0.96, 0.29, -34.11, 40.41)"
              />
              <ellipse
                fill="#ffdf68"
                cx="27.76"
                cy="36.28"
                rx="1.85"
                ry="1.3"
                transform="translate(-15 52.36) rotate(-73.19)"
              />
              <ellipse
                fill="#ffdf68"
                cx="5.78"
                cy="75.12"
                rx="1.85"
                ry="1.3"
                transform="translate(-67.8 58.93) rotate(-73.19)"
              />
              <ellipse
                fill="#ffdf68"
                cx="3.41"
                cy="71.43"
                rx="1.05"
                ry="0.76"
                transform="translate(-68.01 67.95) rotate(-84.48)"
              />
              <ellipse
                fill="#ffdf68"
                cx="19.2"
                cy="44.46"
                rx="0.76"
                ry="1.05"
                transform="matrix(1, -0.09, 0.09, 1, -4.05, 1.97)"
              />
              <ellipse
                fill="#ffdf68"
                cx="28.67"
                cy="13.64"
                rx="1.05"
                ry="0.76"
                transform="translate(-0.6 25.94) rotate(-48.24)"
              />
              <ellipse
                fill="#ffdf68"
                cx="24.6"
                cy="23.11"
                rx="1.05"
                ry="0.76"
                transform="translate(-8.36 30.38) rotate(-55.66)"
              />
              <ellipse
                fill="#ffdf68"
                cx="42.69"
                cy="97.26"
                rx="0.76"
                ry="1.05"
                transform="translate(-8.85 4.38) rotate(-5.33)"
              />
              <ellipse
                fill="#ffdf68"
                cx="17.83"
                cy="103.04"
                rx="2.43"
                ry="3.67"
                transform="matrix(0.98, -0.19, 0.19, 0.98, -19.52, 5.37)"
              />
            </g>
            <g className={isBorn.rightHalf}>
              <path
                fill="#910000"
                d="M98.15,70.58c0,32.84-14.82,61.1-49.08,61.1a56.62,56.62,0,0,1-6.07-.32l6-7.9-9.86-21,7.58-.76-3-10.86L63.91,70.66,50,65.1,52.29,58,45,55.5,55.07,38.32,41.17,23.67l5.06-7.58L37.89,12.3,53.41.43C75.1,4.72,98.15,39.8,98.15,70.58Z"
              />
              <path
                fill="#df3200"
                d="M93.15,68.54c0,31.18-13.83,58-45.78,58h-.71L49,123.46l-9.86-21,7.58-.76-3-10.86L63.91,70.66,50,65.1,52.29,58,45,55.5,55.07,38.32,41.17,23.67l5.06-7.58L37.89,12.3,51.45,1.93C71.68,6,93.15,39.34,93.15,68.54Z"
              />
              <path
                fill="#ff1f1f"
                d="M78.82,64.35c0,24.88-10.62,46.42-35.06,48l-4.61-9.81,7.58-.76-3-10.86L63.91,70.66,50,65.1,52.29,58,45,55.5,55.07,38.32,41.17,23.67l5.06-7.58L37.89,12.3l4.4-3.37C59.58,10.39,78.82,39.2,78.82,64.35Z"
              />
              <path
                fill="#c82d00"
                d="M54.25,94.47c7.77-10,15.81-16.54,23.43-10.63s7.51,18.83-.26,28.85S57.17,126,49.55,120.12,46.48,104.48,54.25,94.47Z"
              />
              <ellipse
                fill="#ff751b"
                cx="72.53"
                cy="92.08"
                rx="12.1"
                ry="9.47"
                transform="translate(-30.15 148.62) rotate(-80.61)"
              />
              <ellipse
                fill="#ff751b"
                cx="69.74"
                cy="23.57"
                rx="5.5"
                ry="7.71"
                transform="translate(-3.79 27.15) rotate(-21.46)"
              />
              <ellipse
                fill="#ff751b"
                cx="57.35"
                cy="15.48"
                rx="3.72"
                ry="4.75"
                transform="translate(-1.32 24.79) rotate(-24.13)"
              />
              <ellipse
                fill="#ff5e1f"
                cx="83.8"
                cy="76.95"
                rx="4"
                ry="3.13"
                transform="translate(0.16 154.08) rotate(-85.24)"
              />
              <ellipse
                fill="#ffdf68"
                cx="84.13"
                cy="104.96"
                rx="1.85"
                ry="1.3"
                transform="translate(-40.68 155.14) rotate(-73.19)"
              />
              <ellipse
                fill="#ffdf68"
                cx="65.78"
                cy="31.35"
                rx="1.3"
                ry="1.85"
                transform="translate(-6.88 25.85) rotate(-21.15)"
              />
              <ellipse
                fill="#ffdf68"
                cx="55.1"
                cy="7.9"
                rx="1.08"
                ry="1.37"
                transform="translate(6.38 34.82) rotate(-37.08)"
              />
              <ellipse
                fill="#ffdf68"
                cx="50.59"
                cy="16.29"
                rx="1.08"
                ry="1.37"
                transform="translate(0.41 33.8) rotate(-37.08)"
              />
              <ellipse
                fill="#ffdf68"
                cx="81.6"
                cy="35.87"
                rx="0.76"
                ry="1.05"
                transform="matrix(0.94, -0.35, 0.35, 0.94, -7.4, 30.87)"
              />
              <ellipse
                fill="#ffdf68"
                cx="61.52"
                cy="61.64"
                rx="0.76"
                ry="1.05"
                transform="matrix(1, -0.09, 0.09, 1, -5.46, 5.98)"
              />
              <ellipse
                fill="#ffdf68"
                cx="65.56"
                cy="81.28"
                rx="1.05"
                ry="0.76"
                transform="translate(-28.89 125.82) rotate(-76.36)"
              />
              <ellipse
                fill="#ffdf68"
                cx="71.49"
                cy="55.2"
                rx="1.05"
                ry="0.76"
                transform="translate(1 111.66) rotate(-76.36)"
              />
              <ellipse
                fill="#ffdf68"
                cx="78.57"
                cy="78.25"
                rx="1.05"
                ry="0.76"
                transform="translate(-16 136.15) rotate(-76.36)"
              />
              <ellipse
                fill="#ffdf68"
                cx="67.33"
                cy="119.11"
                rx="1.05"
                ry="0.76"
                transform="translate(-64.3 156.45) rotate(-76.36)"
              />
              <ellipse
                fill="#ffdf68"
                cx="69.54"
                cy="52.29"
                rx="0.76"
                ry="1.05"
                transform="matrix(1, -0.09, 0.09, 1, -4.55, 6.68)"
              />
              <ellipse
                fill="#ffdf68"
                cx="56.18"
                cy="48.12"
                rx="0.76"
                ry="1.05"
                transform="matrix(1, -0.09, 0.09, 1, -4.23, 5.42)"
              />
              <ellipse
                fill="#ffdf68"
                cx="50.93"
                cy="6.2"
                rx="1.08"
                ry="1.37"
                transform="translate(6.56 31.96) rotate(-37.08)"
              />
              <ellipse
                fill="#ffdf68"
                cx="75.16"
                cy="105.72"
                rx="1.85"
                ry="1.3"
                transform="translate(-47.78 147.09) rotate(-73.19)"
              />
              <ellipse
                fill="#ffdf68"
                cx="73.69"
                cy="113.61"
                rx="4.68"
                ry="3.66"
                transform="translate(-61.6 107.74) rotate(-54.55)"
              />
              <ellipse
                fill="#ffdf68"
                cx="69.52"
                cy="44.64"
                rx="3.66"
                ry="4.68"
                transform="translate(-10.01 22.28) rotate(-17)"
              />
              <ellipse
                fill="#ff751b"
                cx="61.07"
                cy="105.75"
                rx="3.13"
                ry="4"
                transform="translate(-17.13 11.95) rotate(-9.81)"
              />
            </g>
          </g>
        </g>
      </svg>
    </div >
  );
};

export default Egg;
