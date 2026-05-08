import { useState } from "react";

interface AthleteFormProps {
  onAdd: (name: string, country: string, points: number) => void;
}

const AthleteForm = ({ onAdd }: AthleteFormProps) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [points, setPoints] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !country.trim()) return;

    onAdd(name, country, points === "" ? 0 : points);

    setName("");
    setCountry("");
    setPoints("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Sportlase nimi"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Riik"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />

      <input
        type="number"
        placeholder="Punktid"
        value={points}
        onChange={(e) =>
          setPoints(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

      <button type="submit">Lisa sportlane</button>
    </form>
  );
};

export default AthleteForm;