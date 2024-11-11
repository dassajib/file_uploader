import { useEffect, useState } from "react";

import CardContent from "../CardContent/CardContent";

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

  const cardSections = [
    { title: "Incomplete", cards },
    { title: "To Do", cards },
    { title: "Doing", cards },
    { title: "Under Review", cards },
    { title: "Complete", cards },
    { title: "Done", cards },
  ];

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
    <>
      <div className="flex">
        {cardSections.map((sec, idx) => (
          <CardContent
            key={idx}
            cards={cards}
            handleClick={handleClick}
            closeModal={closeModal}
            showModal={showModal}
            fileCount={fileCount}
            fetchFileCount={fetchFileCount}
            title={sec.title}
          />
        ))}
      </div>
    </>
  );
};

export default Card;
