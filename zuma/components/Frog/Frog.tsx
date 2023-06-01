import React, { useState } from 'react';
import Ball, { BallProps } from '../Balls/Balls';
import styles from './Frog.module.scss';

export interface FrogProps {
    x: number;
    y: number;
    shootBall: (ball: BallProps) => void;
}

const Frog = ({ x, y, shootBall }:FrogProps) => {
    const [isShooting, setIsShooting] = useState(false);

    const handleClick = () => {
        setIsShooting(true);
        setTimeout(() => {
            const ball: BallProps = { x: x + 45, y: y - 50, color: 'red4' };
            shootBall(ball);
            setIsShooting(false);
        }, 1000);
    };

    const frogClass = `${styles.frog} ${isShooting ? styles.shooting : ''}`;

    return (
        <div className={frogClass} style={{ left: x, top: y }} onClick={handleClick}>
            <div className={styles.eyes} />
            <div className={styles.tongue} />
        </div>
    );
};

export default Frog;