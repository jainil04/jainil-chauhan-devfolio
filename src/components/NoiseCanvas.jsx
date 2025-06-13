"use client"

import React, { useRef, useEffect } from 'react';

const NoiseCanvas = ({ animate = true, opacity = 15 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;

    const drawNoise = () => {
      // match canvas size to CSS size
      const width = canvas.width = canvas.offsetWidth;
      const height = canvas.height = canvas.offsetHeight;

      // create an ImageData buffer
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;

      // fill with random gray-scale pixels
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = data[i+1] = data[i+2] = v;
        data[i+3] = opacity;  // lower = more translucent
      }

      // paint to canvas
      ctx.putImageData(imgData, 0, 0);

      // loop for animation
      if (animate) frameId = requestAnimationFrame(drawNoise);
    };

    drawNoise();
    return () => cancelAnimationFrame(frameId);
  }, [animate, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default NoiseCanvas;
