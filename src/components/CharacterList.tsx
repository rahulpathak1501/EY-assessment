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
    placeholderData: (prev) => prev, // React Query v5
  });

  const handleRefresh = () => refetch();
  const handlePageChange = (nextPage: number) => {
    setSearchParams({ page: nextPage.toString() });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Rick & Morty Characters</h1>
      <button onClick={handleRefresh}>🔄 Refresh</button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
        }}
      >
        {data?.results?.map((char: any) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          ⬅ Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
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
