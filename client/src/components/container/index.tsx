import { useState } from "react";
import SketchBoard from "../board/SketchBoard";

const Container = () => {
  const [color, setColor] = useState("#000000");
  return (
    <div className="fixed w-full h-full bg-black">
      <div className="text-center">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="w-[90%] h-[90%] m-auto mt-[1%] bg-white">
        {/* <Board /> */}

        <SketchBoard />
        <div className="border-t border-red-400">
          <h1 className="text-2xl text-blue-300">Hellow </h1>
        </div>
      </div>
    </div>
  );
};

export default Container;
