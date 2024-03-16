import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { BASE_URL } from "../API";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { green, grey, red } from "@mui/material/colors";

export default function Answer({ qnAnswers }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const markCorrectOtNot = (qnAnswers, optIndex) => {
    if ([qnAnswers.theAnswer, qnAnswers.chosenOpt].includes(optIndex + 1)) {
      //   console.log("\noption vao" + optIndex);
      return {
        sx: {
          color: qnAnswers.theAnswer === optIndex + 1 ? green[500] : red[500],
        },
      };
    }
  };

  return (
    <Box sx={{ mt: 5, width: "100%", maxWidth: 640, mx: "auto" }}>
      {qnAnswers.map((item, index) => (
        <Accordion
          disableGutters
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownCircleIcon />}
            sx={{
              color: item.theAnswer === item.chosenOpt ? green[500] : red[500],
            }}
          >
            <Typography sx={{ width: "90%", flexShrink: 0 }}>
              <b>{index + 1 + "."}</b> {item.questionContent}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: grey[900] }}>
            {item.questionImage ? (
              <CardMedia
                component="img"
                image={BASE_URL + "images/" + item.questionImage}
                sx={{ m: "10px auto" }}
                // width: "auto",
              />
            ) : null}
            <List>
              {item.options.map((opt, idx) => (
                <ListItem key={idx}>
                  <Typography {...markCorrectOtNot(item, idx)}>
                    <b>{String.fromCharCode(65 + idx) + ". "}</b>
                    {opt}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
