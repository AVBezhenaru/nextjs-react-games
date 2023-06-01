import React from 'react'
import styles from './Balls.module.scss'

export interface BallProps {
    x: number;
    y: number;
    color: string;
}

const Ball=({x,y,color}:BallProps)=>{
    const ballClass = `${styles.ball} ${styles[color]}`;
    return <div className={ballClass} style={{ left: x, top: y }} />;
}

export default Ball