import { FaStar } from "react-icons/fa6";
import { IconContext } from "react-icons";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
`;

export default function ScoreInput({setScore}) {
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    switch (id) {
      case "star1":
        setStar1(true);
        setStar2(false);
        setStar3(false);
        setStar4(false);
        setStar5(false);
        setScore(1)
        return;
      case "star2":
        setStar1(true);
        setStar2(true);
        setStar3(false);
        setStar4(false);
        setStar5(false);
        setScore(2)
        return;
      case "star3":
        setStar1(true);
        setStar2(true);
        setStar3(true);
        setStar4(false);
        setStar5(false);
        setScore(3)
        return;
      case "star4":
        setStar1(true);
        setStar2(true);
        setStar3(true);
        setStar4(true);
        setStar5(false);
        setScore(4)
        return;
      case "star5":
        setStar1(true);
        setStar2(true);
        setStar3(true);
        setStar4(true);
        setStar5(true);
        setScore(5)
        return;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <IconContext.Provider
        value={{ color: `${star1 ? "gold" : "gray"}`, size: "2em" }}
      >
        <FaStar id="star1" onClick={handleClick} />
      </IconContext.Provider>
      <IconContext.Provider
        value={{ color: `${star2 ? "gold" : "gray"}`, size: "2em" }}
      >
        <FaStar id="star2" onClick={handleClick} />
      </IconContext.Provider>
      <IconContext.Provider
        value={{ color: `${star3 ? "gold" : "gray"}`, size: "2em" }}
      >
        <FaStar id="star3" onClick={handleClick} />
      </IconContext.Provider>
      <IconContext.Provider
        value={{ color: `${star4 ? "gold" : "gray"}`, size: "2em" }}
      >
        <FaStar id="star4" onClick={handleClick} />
      </IconContext.Provider>
      <IconContext.Provider
        value={{ color: `${star5 ? "gold" : "gray"}`, size: "2em" }}
      >
        <FaStar id="star5" onClick={handleClick} />
      </IconContext.Provider>
    </Wrapper>
  );
}
