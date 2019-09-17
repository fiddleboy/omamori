import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CalendarIcon from "@material-ui/icons/CalendarToday";

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: "America/New_York",
  timeZoneName: "short"
};

function sortEvents(a: CalendarEvent, b: CalendarEvent) {
  let aTime = a.startDateTime.toLowerCase();
  let bTime = b.startDateTime.toLowerCase();

  if (aTime > bTime) {
    return 1;
  } else if (aTime < bTime) {
    return -1;
  } else {
    return 0;
  }
}

type UpcomingEventsProp = {
  client: Client;
  classes: any;
};

export default function UpcomingEvents({
  client,
  classes
}: UpcomingEventsProp) {
  if (client.events === undefined || client.events.length === 0) {
    return (
      <div>
        <h4>No upcoming events</h4>
      </div>
    );
  }
  return (
    <div>
      <h4>Upcoming events:</h4>
      <List dense={true}>
        {client.events.sort(sortEvents).map((event: any) => (
          <ListItem key={event.calendarEventId}>
            <ListItemIcon>
              <CalendarIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.eventList}
              primary={
                new Intl.DateTimeFormat("en-US", dateOptions).format(
                  new Date(event.startDateTime)
                ) +
                ": " +
                event.description
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
