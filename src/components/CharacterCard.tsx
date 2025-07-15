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
      onClick={() => navigate(`/character/${character.id}`)}
      style={{ cursor: "pointer", textAlign: "center" }}
    >
      <img src={character.image} alt={character.name} width="100" />
      <p>{character.name}</p>
    </div>
  );
}
