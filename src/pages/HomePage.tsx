import { useEffect, useState } from "react";
import type { Athlete } from "../models/Athlete";
import AthleteForm from "../components/AthleteForm";
import AthleteList from "../components/AthleteList";

const HomePage = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  const [page, setPage] = useState(0);
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("points");
  const [order, setOrder] = useState("desc");

  const size = 5;

  const loadAthletes = async () => {
    let url = `http://localhost:2004/athletes?page=${page}&size=${size}&sort=${sort}&order=${order}`;

    if (country) {
      url += `&country=${country}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setAthletes(data.content);
  };

  useEffect(() => {
    loadAthletes();
  }, [page, country, sort, order]);

  // ✅ FIX: nüüd võtab points ka sisse
  const addAthlete = async (name: string, country: string, points: number) => {
    await fetch("http://localhost:2004/athletes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, country, points }),
    });

    loadAthletes();
  };

  const deleteAthlete = async (id: number) => {
    await fetch(`http://localhost:2004/athletes/${id}`, {
      method: "DELETE",
    });

    loadAthletes();
  };

  return (
    <div className="container">
      <h1>Kümnevõistluse sportlased</h1>

      <AthleteForm onAdd={addAthlete} />

      <div style={{ margin: "10px 0" }}>
        <input
          placeholder="Riik"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="points">Points</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">DESC</option>
          <option value="asc">ASC</option>
        </select>
      </div>

      <AthleteList athletes={athletes} onDelete={deleteAthlete} />

      <div style={{ marginTop: "20px" }}>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page + 1}</span>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;