"use client";

import { Half, Modal } from "@/components";
import { useState } from "react";

export default function Home() {
  const [fightState, setFightState] = useState({
    right: {
      name: "right",
      score: 0,
    },
    left: {
      name: "left",
      score: 0,
    },
    winner: "",
  });

  const [modalOpen, setModalOpen] = useState(true);

  const handleCloseModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <main className="flex relative">
      <Half color="red">
        {fightState.left.name} {fightState.left.score}
      </Half>
      <Half color="blue">
        {fightState.right.name} {fightState.right.score}
      </Half>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={"Желаете начать бой?"}
        actions={[{ children: "Начать", onClick: handleCloseModal }]}
      />
    </main>
  );
}
