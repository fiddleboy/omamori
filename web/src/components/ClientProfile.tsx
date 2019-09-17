import React from "react";

//Loading spinner
import { css } from "@emotion/core";
import { CircleLoader } from "react-spinners";
import { Paper } from "@material-ui/core";
import UpcomingEvents from "./UpcomingEvents";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 5em;
`;

type ClientProfileProp = {
  client: Client;
  classes: any;
};

export function ClientProfile({ client, classes }: ClientProfileProp) {
  console.log("Client");
  console.log(client);
  console.log("classes");
  console.log(classes);
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
          <UpcomingEvents client={client} classes={classes} />
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
