"use client";
import { useEffect, useRef } from 'react';

const GlowingBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Center row alignment for 4 blobs
    const spacing = width / 5;

    const baseBlobs = [
      {
        baseX: spacing * 1,
        baseY: height / 2,
        r: 800,
        color: 'rgba(0, 174, 255, 0.12)',
        freqX: 1,
        freqY: 2,
        ampX: 120,
        ampY: 80,
        phase: 0,
      },
      {
        baseX: spacing * 2,
        baseY: height / 2,
        r: 800,
        color: 'rgba(255, 0, 128, 0.1)',
        freqX: 2,
        freqY: 1,
        ampX: 160,
        ampY: 60,
        phase: Math.PI / 3,
      },
      {
        baseX: spacing * 3,
        baseY: height / 2,
        r: 800,
        color: 'rgba(0, 255, 200, 0.1)',
        freqX: 1.5,
        freqY: 1.5,
        ampX: 100,
        ampY: 140,
        phase: Math.PI / 2,
      },
      {
        baseX: spacing * 4,
        baseY: height / 2,
        r: 450,
        color: 'rgba(150, 100, 255, 0.1)',
        freqX: 2,
        freqY: 2,
        ampX: 140,
        ampY: 100,
        phase: Math.PI / 4,
      },
    ];

    const initBlobs = () => {
      const now = Date.now();
      const timeScale = 0.0004;
      for (const blob of baseBlobs) {
        blob.currentX =
          blob.baseX +
          Math.sin(now * timeScale * blob.freqX + blob.phase) * blob.ampX;

        blob.currentY =
          blob.baseY +
          Math.sin(now * timeScale * blob.freqY + blob.phase) * blob.ampY;
      }
    };
    /**
     * Keep the blobs inside viewport
     */

    /*
    const initBlobs = () => {
      const now = Date.now();
      const timeScale = 0.0004;

      for (const blob of baseBlobs) {
        // Constrain amplitude based on radius and screen size
        const maxAmpX = Math.max(0, (width - blob.r * 2) / 2);
        const maxAmpY = Math.max(0, (height - blob.r * 2) / 2);

        // Clamp amplitudes so blob never exceeds canvas bounds
        blob.ampX = Math.min(blob.ampX, maxAmpX);
        blob.ampY = Math.min(blob.ampY, maxAmpY);

        // Initialize positions
        blob.currentX =
          blob.baseX +
          Math.sin(now * timeScale * blob.freqX + blob.phase) * blob.ampX;

        blob.currentY =
          blob.baseY +
          Math.sin(now * timeScale * blob.freqY + blob.phase) * blob.ampY;
      }
    };
    */


    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';

      for (const blob of baseBlobs) {
        const x = blob.currentX;
        const y = blob.currentY;

        if (!isFinite(x) || !isFinite(y)) continue;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      const t = Date.now();
      const timeScale = 0.0004;

      for (const blob of baseBlobs) {
        blob.currentX =
          blob.baseX +
          Math.sin(t * timeScale * blob.freqX + blob.phase) * blob.ampX;

        blob.currentY =
          blob.baseY +
          Math.sin(t * timeScale * blob.freqY + blob.phase) * blob.ampY;
      }

      draw();
      requestAnimationFrame(animate);
    };

    initBlobs();
    draw();
    animate();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const spacing = width / 5;
      baseBlobs.forEach((blob, i) => {
        blob.baseX = spacing * (i + 1);
        blob.baseY = height / 2;
      });
    };

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default GlowingBackground;
