import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

type OutboxEvent = {
  createdAt: string;
  id: string;
  payload: string;
  topic: string;
  updatedAt: string;
};

export default function EventsModal(props: {
  events: OutboxEvent[];
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog onClose={props.onClose} open={props.isOpen}>
      <DialogTitle>Outbox Events</DialogTitle>

      <List sx={{ pt: 0 }}>
        {props.isLoading ? (
          <ListItem>
            <ListItemText primary="Loading..." />
          </ListItem>
        ) : null}

        {!props.isLoading && props.events.length === 0 ? (
          <ListItem>
            <ListItemText primary="No pending items." />
          </ListItem>
        ) : null}

        {!props.isLoading && props.events.length > 0
          ? props.events.map((event) => (
              <ListItem key={event.id}>
                <ListItemText
                  primary={event.createdAt}
                  secondary={
                    <Typography variant="body2">
                      <b>{event.topic}</b> - {JSON.stringify(event.payload)}
                    </Typography>
                  }
                />
              </ListItem>
            ))
          : null}
      </List>
    </Dialog>
  );
}
