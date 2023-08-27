import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FormEvent, useState } from "react";

type Message = {
  createdAt: string;
  id: string;
  message: string;
  updatedAt: string;
  user: string;
};

export default function ServicePanel(props: {
  bgColor: string;
  header: string;
  isBusy?: boolean;
  isSender?: boolean;
  messages: Message[];
  onDeleteMessages?: () => void;
  onRefreshMessages?: () => void;
  onSubmitMessage?: (message: string) => void;
}) {
  const [message, setMessage] = useState("");

  return (
    <Paper sx={{ bgcolor: props.bgColor, borderRadius: "5px", height: "85vh" }}>
      <Grid container height="100%" padding={2} spacing={2}>
        <Grid height="10%" item xs={12}>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h6">{props.header}</Typography>
            </Grid>

            <Grid xs={6}>
              <Grid container justifyContent="flex-end">
                <Grid item xs={6}>
                  <Button
                    onClick={props.onRefreshMessages}
                    disabled={props.isBusy}
                    startIcon={<RestartAltIcon />}
                    variant="contained"
                  >
                    REFRESH
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    color="error"
                    onClick={props.onDeleteMessages}
                    disabled={props.isBusy}
                    startIcon={<DeleteIcon />}
                    variant="contained"
                  >
                    CLEAR
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid height="60%" item xs={12}>
          <Box sx={{ bgcolor: "#FAFAFA", borderRadius: "5px", height: "100%" }}>
            <Grid
              container
              height="100%"
              overflow="auto"
              paddingX={2}
              paddingBottom={4}
              spacing={2}
            >
              {props.messages.map((message) => (
                <Grid key={message.id} item xs={12}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">
                            <b>{message.user}</b>
                          </Typography>
                        </Grid>

                        <Grid alignItems="flex-end" display="flex" item xs={8}>
                          <Typography variant="subtitle2">({message.id})</Typography>
                        </Grid>

                        <Grid
                          alignItems="flex-end"
                          display="flex"
                          flexDirection="column"
                          item
                          justifyContent="flex-end"
                          xs={4}
                        >
                          <Typography textAlign="right" variant="subtitle2">
                            {message.createdAt}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="body1">{message.message}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid height="20%" item xs={12}>
          {props.isSender && (
            <form onSubmit={onSubmitFormHandler}>
              <Grid container alignItems="flex-end">
                <Grid item xs={10}>
                  <TextField
                    disabled={props.isBusy}
                    fullWidth
                    label="Enter Message"
                    onChange={onChangeMessageHandler}
                    value={message}
                    variant="outlined"
                    sx={{ background: "#FFFFFF" }}
                  />
                </Grid>

                <Grid display="flex" item justifyContent="flex-end" xs={2}>
                  <Button
                    color="success"
                    onClick={onSubmitMessageHandler}
                    disabled={props.isBusy || !message}
                    startIcon={<SendIcon />}
                    variant="contained"
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Grid>
      </Grid>
    </Paper>
  );

  function onChangeMessageHandler(event: ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  function onSubmitMessageHandler() {
    if (!props.onSubmitMessage) {
      return;
    }

    if (!message) {
      return;
    }

    props.onSubmitMessage(message);
    setMessage("");
  }

  function onSubmitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmitMessageHandler();
  }
}
