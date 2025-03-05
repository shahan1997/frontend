import React from "react";
import "./delivery.css";

interface Props {
  image: string;
  name: string;
  position: string;
  description: string;
}

const TeamCard = ({ image, name, position, description }: Props) => {
  return (
    <div className="team-card">
      <img src={image} alt={name} className="team-image" />
      <h1 className="team-name">{name}</h1>
      <p className="team-position">{position}</p>
      <p className="team-description">{description}</p>
    </div>
  );
};

export default TeamCard;
