import React from "react";

//Loading spinner
import { css } from "@emotion/core";
import { CircleLoader } from "react-spinners";
import { Paper } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CalendarIcon from "@material-ui/icons/CalendarToday";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 5em;
`;

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: "America/New_York",
  timeZoneName: "short"
};

function sortEvents(a: any, b: any) {
  let aTime = a.startDateTime.toLowerCase();
  let bTime = b.startDateTime.toLowerCase();

  if (aTime > bTime) {
    return 1;
  } else if (aTime < bTime) {
    return -1;
  } else if (aTime === bTime) {
    return 0;
  }
}

export function ClientProfile(props: any) {
  const { client, classes } = props;
  if (client) {
    return (
      <Paper className={classes.detailsCard}>
        <div>
          <div>
            <h2 className={classes.cardTitle}>
              {client.firstName} {client.lastName}
            </h2>
            <hr />
            <p>
              {client.gender} | {client.birthDate}
            </p>
          </div>

          {client.events === undefined || props.client.events.length === 0 ? (
            <div>
              <h4>No upcoming events</h4>
            </div>
          ) : (
            <div>
              <h4>Upcoming events:</h4>
              <List dense={true}>
                {props.client.events.sort(sortEvents).map((event: any) => (
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
          )}
        </div>
      </Paper>
    );
  }
  return (
    <div className="sweet-loading">
      <CircleLoader
        css={override}
        sizeUnit={"px"}
        size={300}
        color={"#3f51b5"}
        loading={true}
      />
    </div>
  );
}
