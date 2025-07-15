import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../services/api";

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id!),
  });

  if (isLoading) return <p>Loading character...</p>;

  return (
    <div className="container">
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <p>
        <strong>Status:</strong> {data.status}
      </p>
      <p>
        <strong>Species:</strong> {data.species}
      </p>
      <p>
        <strong>Gender:</strong> {data.gender}
      </p>
      <p>
        <strong>Location:</strong> {data.location.name}
      </p>
    </div>
  );
}
