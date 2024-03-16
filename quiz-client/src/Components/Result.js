import React, { useEffect, useState } from "react";
import useStateContext from "../Hooks/useStateContext";
import { ENDPOINTS, createAPIEndpoint } from "../API";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { getFormatedTime } from "../Helper";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import Answer from "./Answer";

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const indexQuestion = context.selectedOption.map((idx) => idx.questionId);

    createAPIEndpoint(ENDPOINTS.getAnswer)
      .post(indexQuestion)
      .then((res) => {
        const qnA = context.selectedOption.map((x) => ({
          ...x,
          ...res.data.find((y) => y.questionId === x.questionId),
        }));
        // console.log(qnA);
        setQnAnswers(qnA);
        calculateScore(qnA);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.theAnswer === curr.chosenOpt ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const submitScore = () => {
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.testerId, {
        testerId: context.testerId,
        score: score,
        timeSpend: context.timeSpend,
      })
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      })
      .catch((err) => console.log(err));
  };

  const restart = () => {
    setContext({
      timeSpend: 0,
      selectedOption: [],
    });
    navigate("/Quiz");
  };

  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: "flex",
          width: "100%",
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">Your Score</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>
              /5
            </Typography>
            <Typography variant="h6">
              Took {getFormatedTime(context.timeSpend) + " min"}
            </Typography>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{
                width: "60%",
                m: "auto",
                visibility: showAlert ? "visible" : "hidden",
              }}
            >
              Score Updated
            </Alert>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 220 }} image="./result.png" />
      </Card>
      <Answer qnAnswers={qnAnswers} />
    </>
  );
}
