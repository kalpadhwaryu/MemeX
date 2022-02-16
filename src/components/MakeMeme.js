import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { saveAs } from "file-saver";

export const MakeMeme = ({ meme, setMeme }) => {
  const USERNAME = process.env.REACT_APP_USERNAME;
  const PASSWORD = process.env.REACT_APP_PASSWORD;
  const [form, setForm] = useState({
    template_id: meme.id,
    username: USERNAME,
    password: PASSWORD,
    boxes: [],
  });

  const [copyText, setCopyText] = useState("Copy meme url");
  const [copyBtnDisabled, setCopyBtnDisabled] = useState(false);
  const [emptyInputs, setEmptyInputs] = useState("");

  const generateMeme = () => {
    let url = `https://api.imgflip.com/caption_image?template_id=${form.template_id}&username=${form.username}&password=${form.password}`;
    form.boxes.map((box, index) => {
      url += `&boxes[${index}][text]=${box.text}`;
    });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMeme({ ...meme, url: data.data.url });
          setEmptyInputs("");
        } else {
          setEmptyInputs("Empty inputs");
        }
      });
  };

  const downloadMeme = () => {
    saveAs(meme.url, "meme.jpg");
  };

  return (
    <div className="meme">
      <img src={meme.url} alt={meme.name} />
      <br />
      <br />
      <div>
        {[...Array(meme.box_count)].map((_, index) => (
          <TextField
            id={index}
            key={index}
            error={emptyInputs ? true : false}
            helperText={emptyInputs}
            variant="filled"
            label={`Enter Caption ${index + 1}`}
            sx={{ width: 250, margin: 2, backgroundColor: "white" }}
            onChange={(e) => {
              const newBoxes = form.boxes;
              newBoxes[index] = { text: e.target.value };
              setForm({ ...form, boxes: newBoxes });
            }}
          />
        ))}
      </div>
      <div className="buttons">
        <Button
          onClick={generateMeme}
          variant="contained"
          sx={{ marginX: 3, marginY: 2 }}
        >
          Generate Meme
        </Button>
        <Button
          onClick={downloadMeme}
          variant="contained"
          sx={{ marginX: 3, marginY: 2 }}
        >
          Download Meme
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(meme.url);
            setCopyText("Link Copied");
            setCopyBtnDisabled(true);
            setTimeout(() => {
              setCopyText(copyText);
              setCopyBtnDisabled(false);
            }, 1200);
          }}
          variant="contained"
          sx={{ marginX: 3, marginY: 2 }}
          disabled={copyBtnDisabled}
        >
          {copyText}
        </Button>
        <Button
          onClick={() => {
            setMeme(null);
          }}
          variant="contained"
          sx={{ marginX: 3, marginY: 2 }}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};
