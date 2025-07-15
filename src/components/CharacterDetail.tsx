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
  if (!data) return <p>No character found.</p>;

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
      <p>Gender: {data.gender}</p>
      <p>Location: {data.location.name}</p>
    </div>
  );
}
