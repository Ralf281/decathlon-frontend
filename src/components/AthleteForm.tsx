import { useState } from "react";

interface AthleteFormProps {
  onAdd: (name: string, country: string) => void;
}

const AthleteForm = ({ onAdd }: AthleteFormProps) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !country.trim()) return;

    onAdd(name, country);
    setName("");
    setCountry("");
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
      <button type="submit">Lisa sportlane</button>
    </form>
  );
};

export default AthleteForm;