import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";

//Icons
import Icon from "@mdi/react";
import IconButton from "@material-ui/core/IconButton";
import { mdiAccountCardDetails, mdiArrowLeftBoldCircle } from "@mdi/js";

//Table
import Paper from "@material-ui/core/Paper";
import { Tooltip } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//Patient details
import { ClientProfile } from "./ClientProfile";

//Loading spinner
import { css } from "@emotion/core";
import { CircleLoader } from "react-spinners";
const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 5em;
`;

interface Facility {
  facId: string,
  facilityName: string,
}

interface Patient {
  patientId: string,
  firstName: string,
  lastName: string,
  birthDate: string,
  gender: string,
  admissionDate: string,
}

function Dashboard(props: any) {
  const [selectedFacility, setSelectedFacility] = useState(0);
  const [facilities, setFacilities]: [Array<Facility>, Dispatch<SetStateAction<Array<never>>>] = useState([]);
  const [patients, setPatients]: [Array<Patient>, Dispatch<SetStateAction<Array<never>>>] = useState([]);
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
      if (res.data.data)
      {
        setFacilities(res.data.data);
      }
      }
      catch(e) {
        setFacilities([]);
        setPatients([]);
      }
      try {
        const res = await axios.get("/api/userInfo");
        setUser(res.data.username);
      }
      catch(e) {
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
    }
    catch(e) {
      setPatients([]);
    }
    setSelectedFacility(event.target.value);
  }

  //LOGOUT
  async function handleLogout(props: any) {
    try {
      await axios.get("/api/logout");
      //Logout successful, redirect to Landing page
      props.history.push("/");
    }
    catch(e) {
      console.log(e);
    }
  }

  //TABLE BUTTON
  async function handlePatientDetailsClick(patientId: any) {
    try {
      const res = await axios.get(`/api/patients/${patientId}`);
      setPatientDetails(res.data)
    }
    catch(e) {
      setPatientDetails({})
    }
    setSelectedPatient(patientId);
  };

  //BACK TO TABLE BUTTON
  function backToTableClick() {
    setSelectedPatient(0);
    setPatientDetails(undefined);
  }

  const { classes } = props;
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
            onClick={event => handleLogout(props)}
          >
            Logout
            </Button>
        </Toolbar>
      </AppBar>

      <main className={classes.layout}>
        <div>
          <Typography
            component="h2"
            variant="h2"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            {/* FACILITIES SELECT */}
            <Select
              className={classes.facilitySelect}
              value={selectedFacility}
              onChange={handleFacilityChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {facilities.map((fac, keyIndex) => {
                return (
                  <MenuItem key={keyIndex} value={fac.facId}>
                    {fac.facilityName}
                  </MenuItem>
                );
              })}
            </Select>
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            component="div"
          >
            {//Show either the patient table or the patient details if a patient was selected.
              selectedPatient > 0 ? (
                //PATIENT IS SELECTED
                <div>
                  <Tooltip title="Back to Patient table" placement="right">
                    <IconButton onClick={backToTableClick}>
                      <Icon
                        path={mdiArrowLeftBoldCircle}
                        size={3}
                        color="#3f51b5"
                      />
                    </IconButton>
                  </Tooltip>
                  <ClientProfile
                    client={patientDetails}
                    classes={classes}
                  />
                </div>
              ) : selectedFacility !== 0 ? (
                //DO WE HAVE THE PATIENTS YET?
                patients.length > 0 ? (
                  //PATIENT TABLE
                  <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox" />
                            <TableCell
                              className={classes.tableHeader}
                              align="left"
                            >
                              Name
                            </TableCell>
                            <TableCell
                              className={classes.tableHeader}
                              align="left"
                            >
                              Date of Birth
                            </TableCell>
                            <TableCell
                              className={classes.tableHeader}
                              align="left"
                            >
                              Gender
                            </TableCell>
                            <TableCell
                              className={classes.tableHeader}
                              align="left"
                            >
                              Admission Date
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {patients
                            //Pagination operations
                            .slice(
                              currentPage * rowsPerPage,
                              currentPage * rowsPerPage +
                              rowsPerPage
                            )
                            //Iteration
                            .map(patient => (
                              <TableRow tabIndex={-1} key={patient.patientId}>
                                <TableCell padding="checkbox">
                                  <Tooltip
                                    title="Patient Details"
                                    placement="top"
                                  >
                                    <IconButton
                                      onClick={event =>
                                        handlePatientDetailsClick(
                                          patient.patientId
                                        )
                                      }
                                    >
                                      <Icon
                                        path={mdiAccountCardDetails}
                                        size={2}
                                        color="#72a06e"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  padding="none"
                                  className={classes.tableText}
                                >
                                  {patient.firstName} {patient.lastName}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.tableText}
                                >
                                  {patient.birthDate}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.tableText}
                                >
                                  {patient.gender}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.tableText}
                                >
                                  {patient.admissionDate}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                    <TablePagination
                      rowsPerPageOptions={[5, 10]}
                      component="div"
                      count={patients.length}
                      rowsPerPage={rowsPerPage}
                      page={currentPage}
                      backIconButtonProps={{
                        "aria-label": "Previous Page"
                      }}
                      nextIconButtonProps={{
                        "aria-label": "Next Page"
                      }}
                      onChangePage={(event, page) => setPage(page)}
                      onChangeRowsPerPage={event => setRowsPerPage(+(event.target.value))}
                    />
                  </Paper>
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
