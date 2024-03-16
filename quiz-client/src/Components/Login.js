import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Center from "./Center";
import useForm from "../Hooks/useForm";
import { ENDPOINTS, createAPIEndpoint } from "../API";
import useStateContext from "../Hooks/useStateContext";
import { useNavigate } from "react-router-dom";

const getFreshModelObject = () => ({
  name: "",
  email: "",
});
export default function Login() {
  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate();

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModelObject);

  useEffect(() => {
    resetContext();
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then((res) => {
          setContext({ testerId: res.data.testerId });
          navigate("/quiz");
        })
        .catch((err) => console.log(err));
    }
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email)
      ? ""
      : "Your Email is invalid";
    temp.name = values.name !== "" ? "" : "This field is required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  return (
    <Center>
      {/* {context.testerId} */}
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz app
          </Typography>
          <Box
            sx={{
              "&  .MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={login}>
              <TextField
                label="email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                variant="outlined"
                //check errors.name truthy or falsy, if T return opject containing additional props error
                //{...} spread operator is used to add new prop, error and helperText to TextField if conditional expression is true, if false nothing added
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%" }}
              >
                Start
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
