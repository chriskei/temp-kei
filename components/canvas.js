import React, { useEffect, useRef } from 'react';
import styles from '../styles/canvas.module.css';

// Logo contants
const LOGO_WIDTH = 207;
const LOGO_HEIGHT = 97;

// Velocity constants
const VEL_X = 2;
const VEL_Y = 2;

// Color constants
const colorMap = {
  0: 'green1.svg',
  1: 'green2.svg',
  2: 'green3.svg',
  3: 'green4.svg'
};

export default function Canvas(props) {
  const canvasRef = useRef(null);

  const { width, height } = props;
  const maxX = width - LOGO_WIDTH;
  const maxY = height - LOGO_HEIGHT;

  const calcPos = (frameCount) => {
    const rawX = VEL_X * frameCount;
    const divX = Math.floor(rawX / maxX);
    const remX = rawX % maxX;
    const evenOddX = divX % 2;
    // If even, it goes to the right
    const x = evenOddX === 0 ? remX : maxX - remX;

    const rawY = VEL_Y * frameCount;
    const divY = Math.floor(rawY / maxY);
    const remY = rawY % maxY;
    const evenOddY = divY % 2;
    // If odd, it goes up
    const y = evenOddY % 2 === 0 ? remY : maxY - remY;

    const z = 2 * evenOddY + evenOddX;

    return { x, y, z };
  };

  const draw = (ctx, x, y, z) => {
    ctx.clearRect(0, 0, width, height);

    const img = new Image();
    img.src = colorMap[z];
    ctx.drawImage(img, x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      const { x, y, z } = calcPos(frameCount);
      draw(context, x, y, z);

      frameCount++;
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={styles.canvas}
    />
  );
}
