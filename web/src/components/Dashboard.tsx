import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles } from "@material-ui/core/styles";
import axios from "axios";

import { mdiArrowLeftBoldCircle } from "@mdi/js";

import FacilitySelector from "./FacilitySelector";
import PatientTable from "./PatientTable";

//Loading spinner
import { css } from "@emotion/core";
import { CircleLoader } from "react-spinners";
import SelectedPatient from "./SelectedPatient";
const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 5em;
`;

function Dashboard({ classes, history }: any) {
  const [selectedFacility, setSelectedFacility] = useState(0);
  const [facilities, setFacilities]: [Array<Facility>, any] = useState([]);
  const [patients, setPatients]: [Array<Patient>, any] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(0);
  const [currentPage, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patientDetails, setPatientDetails]: [any, any] = useState(undefined);
  const [user, setUser] = useState("");

  //FETCH FACILITIES ON PAGE LOAD
  useEffect(() => {
    async function get() {
      try {
        const res = await axios.get("/api/facilities");
        if (res.data.data) {
          setFacilities(res.data.data);
        }
      } catch (e) {
        setFacilities([]);
        setPatients([]);
      }
      try {
        const res = await axios.get("/api/userInfo");
        setUser(res.data.username);
      } catch (e) {
        setUser("");
      }
    }
    get();
  }, []);

  //FETCH PATIENTS
  async function handleFacilityChange(event: any) {
    setPatients([]);
    try {
      const res = await axios.get(`/api/patients?facId=${event.target.value}`);
      setPatients(res.data.data);
    } catch (e) {
      setPatients([]);
    }
    setSelectedFacility(event.target.value);
  }

  //LOGOUT
  async function handleLogout() {
    try {
      await axios.get("/api/logout");
      //Logout successful, redirect to Landing page
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  //TABLE BUTTON
  async function handlePatientDetailsClick(patientId: any) {
    try {
      const res = await axios.get(`/api/patients/${patientId}`);
      setPatientDetails(res.data);
    } catch (e) {
      setPatientDetails({});
    }
    setSelectedPatient(patientId);
  }

  //BACK TO TABLE BUTTON
  function backToTableClick() {
    setSelectedPatient(0);
    setPatientDetails(undefined);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={classes.grow}>
            Welcome [{user}]
          </Typography>
          <Button
            className={classes.logoutButton}
            variant="outlined"
            onClick={event => handleLogout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <main className={classes.layout}>
        <div>
          <FacilitySelector
            facilities={facilities}
            classes={classes}
            selectedFacility={selectedFacility}
            handleFacilityChange={handleFacilityChange}
          />
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            component="div"
          >
            {//Show either the patient table or the patient details if a patient was selected.
            selectedPatient > 0 ? (
              //PATIENT IS SELECTED
              <SelectedPatient
                backToTableClick={backToTableClick}
                mdiArrowLeftBoldCircle={mdiArrowLeftBoldCircle}
                patientDetails={patientDetails}
                classes={classes}
              />
            ) : selectedFacility !== 0 ? (
              //DO WE HAVE THE PATIENTS YET?
              patients.length > 0 ? (
                //PATIENT TABLE
                <PatientTable
                  classes={classes}
                  patients={patients}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  handlePatientDetailsClick={handlePatientDetailsClick}
                  setPage={setPage}
                  setRowsPerPage={setRowsPerPage}
                />
              ) : (
                //NO PATIENTS YET, SHOW LOADING SPINNER
                <div className="sweet-loading">
                  <CircleLoader
                    css={override}
                    sizeUnit={"px"}
                    size={300}
                    color={"#3f51b5"}
                    loading={true}
                  />
                </div>
              )
            ) : (
              //NO FACILITY SELECTED AT ALL
              <div>Please select a facility</div>
            )}
          </Typography>
        </div>
      </main>
    </React.Fragment>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = createStyles({
  "@global": {
    body: {
      backgroundColor: "#cbcbcb"
    }
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    fontSize: "2em"
  },
  username: {
    fontSize: "3em"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logoutButton: {
    fontSize: "1em",
    marginLeft: 20,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#ff8466"
    }
  },
  tableHeader: {
    fontSize: "120%",
    fontWeight: "bold"
  },
  tableText: {
    fontSize: "120%"
  },
  layout: {
    maxWidth: "100em",
    paddingLeft: "1em",
    paddingRight: "1em"
  },
  facilitySelect: {
    minWidth: "200px",
    fontSize: "50%",
    backgroundColor: "white"
  },
  detailsCard: {
    maxWidth: "40em",
    marginRight: "auto",
    marginLeft: "auto",
    color: "black"
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: "3em",
    color: "black",
    paddingTop: "0.5rem"
  },
  eventList: {
    fontSize: "120%"
  }
});

export default withStyles(styles)(Dashboard);
