import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import OutboxModal from "./OutboxModal";
import ServicePanel from "./ServicePanel";

export default function App() {
  const [isOutboxModalBusy, setIsOutboxModalBusy] = useState(false);
  const [isOutboxModalOpen, setIsOutboxModalOpen] = useState(false);
  const [isReceiverBusy, setIsReceiverBusy] = useState(false);
  const [isSenderBusy, setIsSenderBusy] = useState(false);
  const [outboxEvents, setOutboxEvents] = useState([]);
  const [receiverMessages, setReceiverMessages] = useState([]);
  const [senderMessages, setSenderMessages] = useState([]);

  useEffect(() => {
    onReloadMessages();
  }, []);

  return (
    <Grid container spacing={6}>
      <OutboxModal
        events={outboxEvents}
        isLoading={isOutboxModalBusy}
        isOpen={isOutboxModalOpen}
        onClose={onCloseOutboxModal}
      />

      <Grid item xs={8}>
        <Typography textAlign="center" variant="h4">
          Outbox PG Demo
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Button variant="outlined" onClick={onOpenOutboxModal}>
          View Outbox Events
        </Button>
      </Grid>

      <Grid item xs={6}>
        <ServicePanel
          bgColor="#f3edfa"
          header="Sender"
          isBusy={isSenderBusy}
          isSender
          messages={senderMessages}
          onDeleteMessages={onDeleteSenderMessages}
          onRefreshMessages={onLoadSenderMessages}
          onSubmitMessage={onCreateMessage}
        />
      </Grid>

      <Grid item xs={6}>
        <ServicePanel
          bgColor="#ffe6d9"
          header="Receiver"
          isBusy={isSenderBusy}
          messages={receiverMessages}
          onDeleteMessages={onDeleteReceiverMessages}
          onRefreshMessages={onLoadReceiverMessages}
        />
      </Grid>
    </Grid>
  );

  async function onCloseOutboxModal() {
    setIsOutboxModalOpen(false);
  }

  async function onCreateMessage(message: string) {
    if (isSenderBusy) {
      return;
    }

    setIsSenderBusy(true);

    await axios.post(
      `${import.meta.env.VITE_SENDER_ENDPOINT_HOST}/messages`,
      {
        message,
        user: "Sender",
      },
      {
        validateStatus: () => true,
      },
    );

    setIsSenderBusy(false);

    await onReloadMessages();
  }

  async function onDeleteReceiverMessages() {
    if (isReceiverBusy) {
      return;
    }

    setIsReceiverBusy(true);

    await axios.delete(`${import.meta.env.VITE_RECEIVER_ENDPOINT_HOST}/messages`, {
      validateStatus: () => true,
    });

    setIsReceiverBusy(false);

    await onReloadMessages();
  }

  async function onDeleteSenderMessages() {
    if (isSenderBusy) {
      return;
    }

    setIsSenderBusy(true);

    await axios.delete(`${import.meta.env.VITE_SENDER_ENDPOINT_HOST}/messages`, {
      validateStatus: () => true,
    });

    setIsSenderBusy(false);

    await onReloadMessages();
  }

  async function onLoadOutboxEvents() {
    if (isOutboxModalBusy) {
      return;
    }

    setIsOutboxModalBusy(true);

    console.log("fetching");

    const response = await axios.get(`${import.meta.env.VITE_SENDER_ENDPOINT_HOST}/outbox-events`, {
      validateStatus: () => true,
    });
    setOutboxEvents(response.data.events);

    setIsOutboxModalBusy(false);
  }

  async function onLoadReceiverMessages() {
    if (isReceiverBusy) {
      return;
    }

    setIsReceiverBusy(true);

    const response = await axios.get(`${import.meta.env.VITE_RECEIVER_ENDPOINT_HOST}/messages`, {
      validateStatus: () => true,
    });
    setReceiverMessages(response.data.messages);

    setIsReceiverBusy(false);
  }

  async function onLoadSenderMessages() {
    if (isSenderBusy) {
      return;
    }

    setIsSenderBusy(true);

    const response = await axios.get(`${import.meta.env.VITE_SENDER_ENDPOINT_HOST}/messages`, {
      validateStatus: () => true,
    });
    setSenderMessages(response.data.messages);

    setIsSenderBusy(false);
  }

  async function onOpenOutboxModal() {
    setIsOutboxModalOpen(true);
    onLoadOutboxEvents();
  }

  async function onReloadMessages() {
    await Promise.allSettled([onLoadReceiverMessages(), onLoadSenderMessages()]);
  }
}
