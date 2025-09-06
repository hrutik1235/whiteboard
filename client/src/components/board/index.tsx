import { useEffect, useRef } from "react";

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Match CSS size with actual resolution
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.6;

    canvas.width = width;
    canvas.height = height;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const getMousePos = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseDown = (event: MouseEvent) => {
      const pos = getMousePos(event);
      lastPosRef.current = pos;
      isDrawingRef.current = true;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDrawingRef.current) return;
      const pos = getMousePos(event);

      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      lastPosRef.current = pos;
    };

    const handleMouseUp = () => {
      isDrawingRef.current = false;
    };

    const handleMouseLeave = () => {
      isDrawingRef.current = false;
    };

    // Attach events
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="board"
      className="board border border-gray-400"
    />
  );
};

export default Board;
