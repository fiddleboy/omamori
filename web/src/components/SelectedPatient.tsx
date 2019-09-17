import React from "react";
import { ClientProfile } from "./ClientProfile";
import { Tooltip, IconButton } from "@material-ui/core";
import Icon from "@mdi/react";

type SelectedPatientProp = {
  backToTableClick: any;
  mdiArrowLeftBoldCircle: any;
  patientDetails: any;
  classes: any;
};

export default function SelectedPatient({
  backToTableClick,
  mdiArrowLeftBoldCircle,
  patientDetails,
  classes
}: SelectedPatientProp) {
  return (
    <div>
      <Tooltip title="Back to Patient table" placement="right">
        <IconButton onClick={backToTableClick}>
          <Icon path={mdiArrowLeftBoldCircle} size={3} color="#3f51b5" />
        </IconButton>
      </Tooltip>
      <ClientProfile client={patientDetails} classes={classes} />
    </div>
  );
}
