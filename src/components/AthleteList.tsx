import type { Athlete } from "../models/Athlete";

interface AthleteListProps {
  athletes: Athlete[];
  onDelete: (id: number) => void;
}

const AthleteList = ({ athletes, onDelete }: AthleteListProps) => {
  if (athletes.length === 0) {
    return <p>Ühtegi sportlast pole lisatud.</p>;
  }

  return (
    <div className="list">
      {athletes.map((athlete) => (
        <div key={athlete.id} className="card">
          <div>
            <h3>{athlete.name}</h3>
            <p>{athlete.country}</p>
          </div>
          <button onClick={() => onDelete(athlete.id)}>Kustuta</button>
        </div>
      ))}
    </div>
  );
};

export default AthleteList;