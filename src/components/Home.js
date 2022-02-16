import React, { useState, useEffect } from "react";
import { MakeMeme } from "./MakeMeme";
import Templates from "./Templates";

export const Home = () => {
  const [temp, setTemp] = useState([]);
  const [meme, setMeme] = useState(null);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setTemp(data.data.memes));
  }, []);

  return (
    <div>
      {meme === null ? (
        <Templates temp={temp} setMeme={setMeme} />
      ) : (
        <MakeMeme meme={meme} setMeme={setMeme} />
      )}
    </div>
  );
};
