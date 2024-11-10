import { useEffect, useState } from "react";
import { TiAttachment } from "react-icons/ti";
import { FaCalendarAlt } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";

import Modal from "../Modal/Modal";
import user1 from "../../assets/user1.jpg";
import user2 from "../../assets/user2.jpg";
import user3 from "../../assets/user3.jpg";
import user4 from "../../assets/user4.jpg";

const Card = () => {
  const [showModal, setShowModal] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  const cards = Array(8).fill({
    clientName: "Client Name",
    taskDescription: "Lorem ipsum dolor sit amet curr...",
    personName: "Sajib Das",
    taskProgress: "1/2",
    date: "8-11-2024",
    icons: { messages: 12, comments: 15 },
  });

  const fetchFileCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/file-count");
      const data = await response.json();
      setFileCount(data.fileCount);
    } catch (error) {
      console.error("Error fetching file count:", error);
    }
  };

  useEffect(() => {
    fetchFileCount();
  }, []);

  const handleClick = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="w-80 h-screen overflow-x-auto p-4 bg-gray-100 shadow-lg">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium opacity-60 flex items-center">
            <span className="text-red-500 mr-2">●</span>Incomplete
          </h2>
          <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-blue-600 text-sm">
            0
          </div>
        </div>
        <div className="overflow-y-scroll h-[80vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg p-3 mb-3 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img
                    src={user1}
                    alt="client avatar"
                    className="rounded-full w-6 h-6 object-cover"
                  />
                  <div className="ml-2">
                    <h3 className="text-[10px] font-medium whitespace-nowrap">
                      {card.clientName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center">
                  <img
                    src={user2}
                    alt="client avatar"
                    className="rounded-full w-6 h-6 object-cover"
                  />
                  <div className="ml-2">
                    <h3 className="text-[10px] font-medium whitespace-nowrap">
                      {card.personName}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">
                    {card.taskDescription}
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <span className="text-xs">{card.taskProgress}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center mt-2">
                <div className="flex items-center">
                  <img
                    src={user3}
                    alt=""
                    className="rounded-full w-6 h-6 object-cover"
                  />
                </div>
                <div className="flex items-center">
                  <img
                    src={user4}
                    alt=""
                    className="rounded-full w-6 h-6 object-cover"
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs">{card.icons.messages}+</span>
                  <LuMessagesSquare size={16} />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs">{card.icons.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TiAttachment
                    onClick={handleClick}
                    size={18}
                    className="cursor-pointer"
                  />
                  {showModal && (
                    <Modal
                      closeModal={closeModal}
                      fetchFileCount={fetchFileCount}
                    />
                  )}
                  <span className="text-xs">
                    {fileCount !== null ? fileCount : 0}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt size={14} />
                  <span className="text-[10px] whitespace-nowrap">
                    {card.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
