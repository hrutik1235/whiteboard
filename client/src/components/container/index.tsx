import { useEffect, useState } from "react";
import SketchBoard from "../board/SketchBoard";
import { socket } from "../../socket";

const Container = () => {
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState<
    {
      color: string;
      id: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    socket.on("active-users", (data) => {
      console.log("Active Users Data", data);
      setActiveUsersCount(data.count);
      setActiveUsers(data.users);
    });
  }, []);

  return (
    <div className="fixed w-full h-full bg-gray-100 pb-10">
      <div className="text-center"></div>
      <div className="w-[90%] h-[90%] m-auto mt-5 ">
        {/* <Board /> */}

        <SketchBoard />
      </div>
      <div className="ml-20">
        <div className="">
          <div>User Count: {activeUsersCount}</div>
        </div>
        <div className=" flex items-center gap-5 ">
          <div>Active Users:</div>
          <div className="flex gap-5 flex-wrap">
            {activeUsers.length &&
              activeUsers.map((user, i) => (
                <div
                  key={i}
                  className="border shadow-sm flex items-center justify-center gap-2 px-3 py-1 rounded-md"
                  style={{ borderColor: user?.color }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: user?.color }}
                  ></div>{" "}
                  <p>{user?.id === socket.id ? "You" : user?.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
