import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import MenuIcon from "@material-ui/icons/Menu";

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

class Dashboard extends React.Component {
  state = {
    selectedFacility: "",
    facilities: [],
    patients: [],
    selectedPatient: 0,
    page: 0,
    rowsPerPage: 5,
    patientDetails: undefined,
    user: ""
  };

  //FETCH FACILITIES ON PAGE LOAD
  componentDidMount() {
    axios
      .get("/api/facilities")
      .then(res => {
        this.setState({
          facilities: res.data.data
        });
      })
      .catch(err =>
        this.setState({
          facilities: [],
          patients: []
        })
      );
    axios
      .get("/api/userInfo")
      .then(res => {
        this.setState({
          user: res.data.username
        });
      })
      .catch(err =>
        this.setState({
          user: ""
        })
      );
  }

  //FETCH PATIENTS
  handleFacilityChange = event => {
    this.setState({ patients: [] });
    axios
      .get(`/api/patients?facId=${event.target.value}`)
      .then(res => {
        this.setState({
          patients: res.data.data
        });
      })
      .catch(err =>
        this.setState({
          patients: []
        })
      );
    this.setState({ selectedFacility: event.target.value });
  };

  //LOGOUT
  handleLogout = event => {
    axios.get("/api/logout").then(res => {
      //Logout successful, redirect to Landing page
      this.props.history.push("/");
    });
  };

  //TABLE BUTTON
  handlePatientDetailsClick = (event, patientId) => {
    axios
      .get(`/api/patients/${patientId}`)
      .then(res => {
        this.setState({
          patientDetails: res.data
        });
      })
      .catch(err =>
        this.setState({
          patientDetails: {}
        })
      );
    this.setState({ selectedPatient: patientId });
  };

  //BACK TO TABLE BUTTON
  backToTableClick = (event, patientId) => {
    this.setState({ selectedPatient: 0 });
    this.setState({ patientDetails: undefined });
  };

  //TABLE PAGINATION
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Dashboard
            </Typography>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.username}
              noWrap
            >
              Welcome {this.state.user}
            </Typography>
            <Button
              className={classes.logoutButton}
              variant="outlined"
              onClick={this.handleLogout}
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
                value={this.state.selectedFacility}
                onChange={this.handleFacilityChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.facilities.map((e, keyIndex) => {
                  return (
                    <MenuItem key={keyIndex} value={e.facId}>
                      {e.facilityName}
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
              this.state.selectedPatient > 0 ? (
                //PATIENT IS SELECTED
                <div>
                  <Tooltip title="Back to Patient table" placement="right">
                    <IconButton onClick={event => this.backToTableClick(event)}>
                      <Icon
                        path={mdiArrowLeftBoldCircle}
                        size={3}
                        color="#3f51b5"
                      />
                    </IconButton>
                  </Tooltip>
                  <ClientProfile
                    client={this.state.patientDetails}
                    classes={classes}
                  />
                </div>
              ) : this.state.selectedFacility > 0 ? (
                //DO WE HAVE THE PATIENTS YET?
                this.state.patients.length > 0 ? (
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
                          {this.state.patients
                            //Pagination operations
                            .slice(
                              this.state.page * this.state.rowsPerPage,
                              this.state.page * this.state.rowsPerPage +
                                this.state.rowsPerPage
                            )
                            //Iteration
                            .map(patient => (
                              <TableRow tabIndex={-1} key={patient.patientId}>
                                <TableCell padding="checkbox">
                                  <Tooltip
                                    title="Patient Details"
                                    placement="top"
                                    size="2"
                                  >
                                    <IconButton
                                      onClick={event =>
                                        this.handlePatientDetailsClick(
                                          event,
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
                      count={this.state.patients.length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      backIconButtonProps={{
                        "aria-label": "Previous Page"
                      }}
                      nextIconButtonProps={{
                        "aria-label": "Next Page"
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
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
                <div align="left">Please select a facility</div>
              )}
            </Typography>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = {
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
    fontSize: "3em"
  },
  username: {
    fontSize: "3em"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logoutButton: {
    fontSize: "1.5em",
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
};

export default withStyles(styles)(Dashboard);
