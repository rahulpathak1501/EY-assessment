import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../services/api";
import { useSearchParams } from "react-router-dom";
import CharacterCard from "./CharacterCard";

export default function CharacterList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
    placeholderData: (prev) => prev,
  });

  const handleRefresh = () => refetch();
  const handlePageChange = (nextPage: number) => {
    setSearchParams({ page: nextPage.toString() });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Rick & Morty Explorer</h1>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleRefresh}>Refresh</button>
      </div>

      <div className="character-grid">
        {data?.results?.map((char: any) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          ⬅ Prev
        </button>
        <span style={{ margin: "0 1rem" }}>Page {page}</span>
        <button
          disabled={!data?.info?.next}
          onClick={() => handlePageChange(page + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
