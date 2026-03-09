import { useRef, useEffect, useCallback } from 'react';
import './IntelligenceAnimation.css';

const MARKERS = [
  { lat: 40.71, lng: -74.01, label: 'pattern recognition' },
  { lat: 51.51, lng: -0.13, label: 'risk modeling' },
  { lat: 35.68, lng: 139.69, label: 'signal extraction' },
  { lat: 1.35, lng: 103.82, label: 'decision logic' },
  { lat: 22.32, lng: 114.17, label: 'volatility mapping' },
  { lat: 19.08, lng: 72.88, label: 'order flow' },
  { lat: -33.87, lng: 151.21, label: 'regime detection' },
  { lat: 47.37, lng: 8.54, label: 'alpha generation' },
  { lat: 25.20, lng: 55.27, label: 'latent structure' },
  { lat: 37.57, lng: 126.98, label: 'inference' },
];

const CONNECTIONS: { from: [number, number]; to: [number, number] }[] = [
  { from: [40.71, -74.01], to: [51.51, -0.13] },
  { from: [51.51, -0.13], to: [35.68, 139.69] },
  { from: [35.68, 139.69], to: [22.32, 114.17] },
  { from: [40.71, -74.01], to: [1.35, 103.82] },
  { from: [51.51, -0.13], to: [19.08, 72.88] },
  { from: [1.35, 103.82], to: [-33.87, 151.21] },
  { from: [22.32, 114.17], to: [37.57, 126.98] },
  { from: [51.51, -0.13], to: [47.37, 8.54] },
  { from: [19.08, 72.88], to: [25.20, 55.27] },
  { from: [40.71, -74.01], to: [37.57, 126.98] },
];

function latLngToXYZ(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(x: number, y: number, z: number, cx: number, cy: number, fov: number): [number, number] {
  const scale = fov / (fov + z);
  return [x * scale + cx, y * scale + cy];
}

export default function IntelligenceAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotYRef = useRef(0.4);
  const rotXRef = useRef(0.3);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const dotsRef = useRef<[number, number, number][]>([]);

  useEffect(() => {
    const dots: [number, number, number][] = [];
    const numDots = 1200;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numDots; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
      dots.push([
        Math.cos(theta) * Math.sin(phi),
        Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
      ]);
    }
    dotsRef.current = dots;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.456;
    const fov = 600;

    if (!dragRef.current.active) {
      rotYRef.current += 0.002;
    }

    timeRef.current += 0.015;
    const time = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    // Globe outline — subtle, no fill
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 230, 255, 0.06)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    const ry = rotYRef.current;
    const rx = rotXRef.current;

    // Draw dots
    const dots = dotsRef.current;
    for (let i = 0; i < dots.length; i++) {
      let [x, y, z] = dots[i];
      x *= radius;
      y *= radius;
      z *= radius;

      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);

      if (z > 0) continue;

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const depthAlpha = Math.max(0.1, 1 - (z + radius) / (2 * radius));
      const dotSize = 1 + depthAlpha * 0.8;

      ctx.beginPath();
      ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 230, 255, ${(depthAlpha * 0.4).toFixed(2)})`;
      ctx.fill();
    }

    // Draw connections as arcs
    for (const conn of CONNECTIONS) {
      const [lat1, lng1] = conn.from;
      const [lat2, lng2] = conn.to;

      let [x1, y1, z1] = latLngToXYZ(lat1, lng1, radius);
      let [x2, y2, z2] = latLngToXYZ(lat2, lng2, radius);

      [x1, y1, z1] = rotateX(x1, y1, z1, rx);
      [x1, y1, z1] = rotateY(x1, y1, z1, ry);
      [x2, y2, z2] = rotateX(x2, y2, z2, rx);
      [x2, y2, z2] = rotateY(x2, y2, z2, ry);

      if (z1 > radius * 0.3 && z2 > radius * 0.3) continue;

      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);

      // Elevated midpoint for arc
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const midZ = (z1 + z2) / 2;
      const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
      const arcHeight = radius * 1.25;
      const elevX = (midX / midLen) * arcHeight;
      const elevY = (midY / midLen) * arcHeight;
      const elevZ = (midZ / midLen) * arcHeight;
      const [scx, scy] = project(elevX, elevY, elevZ, cx, cy, fov);

      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.quadraticCurveTo(scx, scy, sx2, sy2);
      ctx.strokeStyle = 'rgba(122, 92, 255, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Traveling dot along arc
      const t = (Math.sin(time * 1.2 + lat1 * 0.1) + 1) / 2;
      const tx = (1 - t) * (1 - t) * sx1 + 2 * (1 - t) * t * scx + t * t * sx2;
      const ty = (1 - t) * (1 - t) * sy1 + 2 * (1 - t) * t * scy + t * t * sy2;

      ctx.beginPath();
      ctx.arc(tx, ty, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 230, 255, 0.9)';
      ctx.fill();
    }

    // Draw markers
    for (const marker of MARKERS) {
      let [x, y, z] = latLngToXYZ(marker.lat, marker.lng, radius);
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);

      if (z > radius * 0.1) continue;

      const [sx, sy] = project(x, y, z, cx, cy, fov);

      // Pulse ring
      const pulse = Math.sin(time * 2 + marker.lat) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(sx, sy, 4 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(122, 92, 255, ${(0.2 + pulse * 0.15).toFixed(2)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Core dot
      ctx.beginPath();
      ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 230, 255, 1)';
      ctx.fill();

      // Label
      if (marker.label) {
        ctx.font = '10px "JetBrains Mono", system-ui, sans-serif';
        ctx.fillStyle = 'rgba(0, 230, 255, 0.5)';
        ctx.fillText(marker.label, sx + 8, sy + 3);
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startRotY: rotYRef.current,
      startRotX: rotXRef.current,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    rotYRef.current = dragRef.current.startRotY + dx * 0.005;
    rotXRef.current = Math.max(-1, Math.min(1, dragRef.current.startRotX + dy * 0.005));
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  return (
    <div className="intelligence-canvas-container">
      <canvas
        ref={canvasRef}
        className="intelligence-canvas intelligence-globe"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </div>
  );
}
