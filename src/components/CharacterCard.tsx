import React from "react";
import { useNavigate } from "react-router-dom";

interface CharacterCardProps {
  character: {
    id: number;
    name: string;
    image: string;
  };
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/character/${character.id}`)}
    >
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
    </div>
  );
}
