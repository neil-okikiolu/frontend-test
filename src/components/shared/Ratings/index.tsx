import React from "react";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";
import "./styles.scss";

interface RatingProps {
  score: number;
  maximum: number;
  containerClassName?: string;
}

const Ratings: React.FC<RatingProps> = ({
  score,
  maximum,
  containerClassName
}) => {
  const stars = [];
  let scoreCount = score;

  for (let i = 0; i < maximum; i++) {
    if (scoreCount >= 1) {
      stars.push(<MdStar key={i} />);
      scoreCount--;
    } else if (scoreCount > 0) {
      stars.push(<MdStarHalf key={i} />);
      scoreCount--;
    } else {
      stars.push(<MdStarOutline key={i} />);
    }
  }

  return (
    <div className={`ratings-container ${containerClassName}`}>{stars}</div>
  );
};

export default Ratings;
