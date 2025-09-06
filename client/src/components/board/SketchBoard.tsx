import { useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { socket } from "../../socket";
import { useParams, useLocation } from "react-router-dom";

const styles = {
  width: "90vw",
  height: "80vh",
  border: "1px solid #ccc",
};

const SketchBoard = () => {
  const canvasRef = useRef<any>(null);
  const { room } = useParams();
  const location = useLocation();

  //   const [activeUsers, setActiveUsers] = useState([]);

  const { state } = location;

  useEffect(() => {
    if (!canvasRef.current) return;

    socket.on("init-draw", (data) => {
      if (canvasRef.current && data && data.length > 0) {
        canvasRef.current.loadPaths(data);
      }
    });

    socket.on("draw", (stroke) => {
      if (canvasRef.current && stroke) {
        canvasRef.current.loadPaths([stroke]);
      }
    });

    socket.on("clear", () => {
      canvasRef.current.clearCanvas();
    });

    socket.emit("join-room", {
      room,
      name: state?.name || "Guest",
      color: state?.color || "#000000",
    });

    return () => {
      socket.off("init-draw");
      socket.off("draw");
      socket.off("clear");
      socket.off("active-users");
    };
  }, [room]);

  const handleStroke = async () => {
    if (!canvasRef.current) return;
    const paths = await canvasRef.current.exportPaths();
    const lastStroke = paths[paths.length - 1];
    if (lastStroke) {
      socket.emit("draw", { stroke: lastStroke, room });
    }
  };

  const clearBoard = () => {
    canvasRef.current.clearCanvas();
    socket.emit("clear", room);
  };

  return (
    <div className="relative">
      <ReactSketchCanvas
        ref={canvasRef}
        style={styles}
        strokeWidth={3}
        strokeColor={state?.color || "#000000"}
        onStroke={handleStroke}
      />
      <button
        onClick={clearBoard}
        className="absolute top-1 left-1 bg-red-500 text-white px-3 py-1 rounded"
      >
        Clear
      </button>
    </div>
  );
};

export default SketchBoard;
