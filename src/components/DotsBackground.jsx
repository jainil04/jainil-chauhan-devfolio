"use client"

import React, { useRef, useEffect } from 'react';

const DotsBackground = ({
  /** gap between dots (number → px, or string like "2rem"/"32px") */
  spacing = 90,
  /** radius of each dot in px (or string rem/px) */
  dotRadius = 1,
  /** how far (in px) the repel effect reaches */
  repulsionRadius = 100,
  /** maximum distance (in px) a dot is pushed */
  repulsionStrength = 500,
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dotPositionsRef = useRef([]);

  // parse a prop (number or "Xrem"/"Xpx") into a pixel value
  const parseSize = (value) => {
    if (typeof value === 'number') return value;
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    if (value.endsWith('rem')) {
      return parseFloat(value) * rootFontSize;
    }
    if (value.endsWith('px')) {
      return parseFloat(value);
    }
    return parseFloat(value);
  };

  // build a grid of dot center positions
  const setupDots = (width, height, gap) => {
    const positions = [];
    for (let x = gap / 2; x < width; x += gap) {
      for (let y = gap / 2; y < height; y += gap) {
        positions.push({ x, y });
      }
    }
    dotPositionsRef.current = positions;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    // get pixel-ratio for crispness on high-DPI screens
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      // set canvas drawing buffer
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      // match CSS size
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      // scale so drawing commands use CSS px
      ctx.scale(dpr, dpr);

      const gap = parseSize(spacing);
      setupDots(cw, ch, gap);
    };

    // track mouse
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      ctx.clearRect(0, 0, cw, ch);

      // choose dot color based on Tailwind dark class
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

      const rRad = parseSize(repulsionRadius);
      const rStr = parseSize(repulsionStrength);
      const dr   = parseSize(dotRadius);

      dotPositionsRef.current.forEach(({ x, y }) => {
        let drawX = x;
        let drawY = y;
        const dx = x - mouseRef.current.x;
        const dy = y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);

        if (dist < rRad) {
          // normalized direction times strength fall-off
          const force = (1 - dist / rRad) * rStr;
          drawX += (dx / dist) * force;
          drawY += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, dr, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    // init
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [spacing, dotRadius, repulsionRadius, repulsionStrength]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none bg-transparent"
    />
  );
};

export default DotsBackground;
