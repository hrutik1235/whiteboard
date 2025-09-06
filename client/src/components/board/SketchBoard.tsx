import { useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";

const styles = {
  width: "90vw",
  height: "80vh",
  border: "1px solid #ccc",
};

const SketchBoard = () => {
  const canvasRef = useRef<any>(null);
  const { room } = useParams();

  useEffect(() => {
    // if (!canvasRef.current) return;

    socket.on("draw", (data) => {
      if (data && data.length > 0) {
        canvasRef.current.loadPaths(data);
      }
    });

    socket.on("join-room", (data) => {
      console.log("Joined Room Data", data);
    });

    socket.on("active-users", (data) => {
      console.log("Active Users Data", data);
    });

    socket.on("clear", () => {
      canvasRef.current.clearCanvas();
    });

    return () => {
      socket.off("draw");
      socket.off("clear");
      socket.off("active-users");
    };
  }, [room]);

  const handleStroke = async () => {
    const paths = await canvasRef.current.exportPaths();
    if (room) {
      socket.emit("draw", { paths, room });
    } else {
      socket.emit("draw", paths);
    }
  };

  const clearBoard = () => {
    canvasRef.current.clearCanvas();

    if (room) {
      socket.emit("clear", room);
    } else {
      socket.emit("clear");
    }
  };

  return (
    <div>
      <ReactSketchCanvas
        ref={canvasRef}
        style={styles}
        strokeWidth={3}
        strokeColor="red"
        onStroke={handleStroke}
      />
      <button
        onClick={clearBoard}
        className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded"
      >
        Clear
      </button>
    </div>
  );
};

export default SketchBoard;
