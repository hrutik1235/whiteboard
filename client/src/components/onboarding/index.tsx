import { useState } from "react";
// import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";

const OnboardingUser = () => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/${room}`, {
      state: {
        name: name,
        color: color,
      },
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-orange-300">
      <div className="p-5 rounded-md bg-white flex flex-col gap-5">
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="border border-gray-400 rounded-md p-2"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Room"
          value={room}
          className="border border-gray-400 rounded-md p-2"
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button
          className="w-full py-2 text-white bg-blue-500 rounded-md"
          onClick={onSubmit}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default OnboardingUser;
