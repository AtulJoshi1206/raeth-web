import { useRef, useEffect, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function MarketNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const nodes: Node[] = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        radius: 2 + Math.random() * 2.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }
    nodesRef.current = nodes;

    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.001,
        vy: (Math.random() - 0.5) * 0.001,
        life: Math.random() * 200,
        maxLife: 150 + Math.random() * 150,
        size: 0.5 + Math.random() * 1,
      });
    }
    particlesRef.current = particles;
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

    timeRef.current += 1;
    const time = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    const nodes = nodesRef.current;
    const particles = particlesRef.current;

    // Update and draw nodes
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0.05 || node.x > 0.95) node.vx *= -1;
      if (node.y < 0.05 || node.y > 0.95) node.vy *= -1;
      node.pulse += node.pulseSpeed;
    }

    // Draw connections
    const connectionDist = 0.35;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.15;
          const x1 = nodes[i].x * w;
          const y1 = nodes[i].y * h;
          const x2 = nodes[j].x * w;
          const y2 = nodes[j].y * h;

          const grad = ctx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0, `rgba(0, 212, 240, ${alpha})`);
          grad.addColorStop(0.5, `rgba(123, 97, 255, ${alpha * 0.8})`);
          grad.addColorStop(1, `rgba(0, 212, 240, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw signal streams (horizontal flowing lines)
    for (let i = 0; i < 5; i++) {
      const yPos = (0.15 + i * 0.18) * h;
      const offset = (time * 0.5 + i * 60) % w;
      const streamAlpha = 0.04 + Math.sin(time * 0.01 + i) * 0.02;

      ctx.beginPath();
      ctx.moveTo(0, yPos);
      for (let x = 0; x < w; x += 4) {
        const wave = Math.sin((x + offset) * 0.01 + i) * 8 +
                     Math.sin((x + offset) * 0.025 + i * 2) * 4;
        ctx.lineTo(x, yPos + wave);
      }
      ctx.strokeStyle = `rgba(0, 212, 240, ${streamAlpha})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }

    // Draw nodes
    for (const node of nodes) {
      const px = node.x * w;
      const py = node.y * h;
      const pulseSize = Math.sin(node.pulse) * 0.5 + 0.5;

      // Outer glow
      const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, node.radius * 6);
      glowGrad.addColorStop(0, `rgba(123, 97, 255, ${0.08 * pulseSize})`);
      glowGrad.addColorStop(1, 'rgba(123, 97, 255, 0)');
      ctx.beginPath();
      ctx.arc(px, py, node.radius * 6, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(px, py, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 240, ${0.4 + pulseSize * 0.3})`;
      ctx.fill();
    }

    // Update and draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life += 1;
      if (p.life > p.maxLife || p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1) {
        p.x = Math.random();
        p.y = Math.random();
        p.vx = (Math.random() - 0.5) * 0.001;
        p.vy = (Math.random() - 0.5) * 0.001;
        p.life = 0;
      }

      const lifeRatio = p.life / p.maxLife;
      const fadeIn = Math.min(lifeRatio * 5, 1);
      const fadeOut = Math.max(1 - (lifeRatio - 0.7) / 0.3, 0);
      const alpha = fadeIn * fadeOut * 0.35;

      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 240, ${alpha})`;
      ctx.fill();
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
