"use client"

import React, { useRef, useEffect } from 'react';

const AbstractDotsBackground = ({
  /** approximate gap between dots → affects count */
  spacing = 80,
  /** dot radius (number=px or string, e.g. "0.25rem"/"4px") */
  dotRadius = 3,
  /** how far the mouse repels (px or rem/px string) */
  repulsionRadius = 120,
  /** max push distance (px or rem/px string) */
  repulsionStrength = 80,
  /** array of CSS colors for dots */
  palette = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFC300', '#845EC2'],
  /** drift acceleration per frame (smaller = smoother) */
  driftSpeed = 0.02,
  /** max drift velocity */
  maxSpeed = 0.3,
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef([]);

  // parse number|string → px number
  const parseSize = (v) => {
    if (typeof v === 'number') return v;
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (v.endsWith('rem')) return parseFloat(v) * root;
    if (v.endsWith('px')) return parseFloat(v);
    return parseFloat(v);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let animId;

    // on resize, rebuild dot list
    const resize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      // reset transform (avoid cumulative scales)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = parseSize(spacing);
      const count = Math.floor((W * H) / (gap * gap));
      const dots = [];
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() * 2 - 1) * maxSpeed,
          vy: (Math.random() * 2 - 1) * maxSpeed,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
      dotsRef.current = dots;
    };

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // main draw loop
    const draw = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      const rRad = parseSize(repulsionRadius);
      const rStr = parseSize(repulsionStrength);
      const dr   = parseSize(dotRadius);

      for (const d of dotsRef.current) {
        // — smooth drift
        d.vx += (Math.random() * 2 - 1) * driftSpeed;
        d.vy += (Math.random() * 2 - 1) * driftSpeed;
        d.vx = Math.max(-maxSpeed, Math.min(maxSpeed, d.vx));
        d.vy = Math.max(-maxSpeed, Math.min(maxSpeed, d.vy));
        d.x += d.vx;
        d.y += d.vy;
        // bounce off edges
        if (d.x < 0)      { d.x = 0;      d.vx *= -1; }
        if (d.x > W)      { d.x = W;      d.vx *= -1; }
        if (d.y < 0)      { d.y = 0;      d.vy *= -1; }
        if (d.y > H)      { d.y = H;      d.vy *= -1; }

        // — mouse repulsion
        let dx = d.x - mouseRef.current.x;
        let dy = d.y - mouseRef.current.y;
        let dist = Math.hypot(dx, dy);
        let drawX = d.x, drawY = d.y;
        if (dist < rRad && dist > 0) {
          const force = (1 - dist / rRad) * rStr;
          drawX += (dx / dist) * force;
          drawY += (dy / dist) * force;
        }

        // — render
        ctx.beginPath();
        ctx.arc(drawX, drawY, dr, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    // init
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [
    spacing, dotRadius,
    repulsionRadius, repulsionStrength,
    palette, driftSpeed, maxSpeed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none bg-transparent"
    />
  );
};

export default AbstractDotsBackground;
