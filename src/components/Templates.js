import React from "react";

const Templates = ({ temp, setMeme }) => {
  return (
    <div className="makeMeme">
      <h4>Click on any template to generate memes</h4>
      {temp.map((temp) => (
        <div
          key={temp.id}
          className="temp-list"
          onClick={() => {
            setMeme(temp);
          }}
        >
          <img className="memeTemp" src={temp.url}></img>
        </div>
      ))}
    </div>
  );
};

export default Templates;
