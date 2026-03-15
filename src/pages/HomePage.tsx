import { useState } from "react";
import type { Athlete } from "../models/Athlete";
import AthleteForm from "../components/AthleteForm";
import AthleteList from "../components/AthleteList";

const HomePage = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  const addAthlete = (name: string, country: string) => {
    const newAthlete: Athlete = {
      id: Date.now(),
      name,
      country,
    };

    setAthletes((prev) => [...prev, newAthlete]);
  };

  const deleteAthlete = (id: number) => {
    setAthletes((prev) => prev.filter((athlete) => athlete.id !== id));
  };

  return (
    <div className="container">
      <h1>Kümnevõistluse sportlased</h1>
      <AthleteForm onAdd={addAthlete} />
      <AthleteList athletes={athletes} onDelete={deleteAthlete} />
    </div>
  );
};

export default HomePage;