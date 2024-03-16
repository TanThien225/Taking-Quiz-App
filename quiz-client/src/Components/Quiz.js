import React, { useEffect, useRef, useState } from "react";
import { BASE_URL, ENDPOINTS, createAPIEndpoint } from "../API";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { getFormatedTime } from "../Helper";
import useStateContext from "../Hooks/useStateContext";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../Hooks/useInterval";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  const { context, setContext } = useStateContext();
  const navigate = useNavigate();
  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    setContext({
      timeSpend: 0,
      selectedOption: [],
    });
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        // console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => console.log(err));
    startTimer();
    //return this function 'll invoke whenever we leave this component navigate to othes, reload
    return () => {
      clearInterval(timer);
    };
  }, []);

  const timerStarted = useRef(false);

  const showAnswer = (questionId, optionsId) => {
    // console.log(context.selectedOptions);
    const temp = [...context.selectedOption];
    // this state context is immutable bat bien, can not update
    temp.push({
      questionId: questionId,
      chosenOpt: optionsId,
    });

    if (qnIndex < 4) {
      setContext({ selectedOption: [...temp] });
      //move to others question
      setQnIndex(qnIndex + 1);
    }
    //last question update timetaken
    else {
      setContext({ selectedOption: [...temp], timeSpend: timeTaken });
      //navigate to result component
      navigate("/Result");
    }
  };

  return questions.length === 0 ? null : (
    <Card
      sx={{
        maxWidth: 640,
        mx: "auto",
        mt: 5,
        "& .MuiCardHeader-action": { m: 0, alignSelf: "center" },
      }}
    >
      <CardHeader
        title={"Question " + (qnIndex + 1) + " of 5:"}
        action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
      />
      <Box>
        <LinearProgress
          variant="determinate"
          value={((qnIndex + 1) / 5) * 100}
        />
      </Box>
      {questions[qnIndex].questionImage == null ? null : (
        <CardMedia
          component="img"
          image={BASE_URL + "images/" + questions[qnIndex].questionImage}
          sx={{ m: "10px auto" }}
          // width: "auto",
        />
      )}
      <CardContent>
        <Typography variant="h6">
          {questions[qnIndex].questionContent}
        </Typography>
        <List>
          {questions[qnIndex].options.map((item, index) => (
            <ListItemButton
              key={index}
              disableRipple
              onClick={() =>
                showAnswer(questions[qnIndex].questionId, index + 1)
              }
            >
              <b>{String.fromCharCode(65 + index) + ". "}</b>
              {item}
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
