import { useSearch } from "@oramacloud/client/react";
import { useEffect, useState } from "react";
import { Game } from "./components/Game";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [selected, setSelected] = useState({});
  const [term, setTerm] = useState("");
  const { results } = useSearch({
    term,
    limit: 50,
    tolerance: 1,
  });

  useEffect(() => {
    if (!term && results?.hits) {
      setSelected(results.hits[0].document);
    }
  }, [term, results]);

  return (
    <>
      <div className="container sm:flex gap-8 my-12">
        <Sidebar
          results={results || []}
          onChange={setTerm}
          onSelected={setSelected}
        />
        {selected.title ? <Game selected={selected} /> : null}
      </div>
    </>
  );
}

export default App;
