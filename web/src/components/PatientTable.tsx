import React from "react";

import Paper from "@material-ui/core/Paper";
import { Tooltip } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@mdi/react";
import IconButton from "@material-ui/core/IconButton";
import { mdiAccountCardDetails } from "@mdi/js";

type PatientTableProp = {
  classes: any;
  patients: Array<Patient>;
  currentPage: number;
  rowsPerPage: number;
  handlePatientDetailsClick: any;
  setPage: any;
  setRowsPerPage: any;
};

export default function PatientTable({
  classes,
  patients,
  currentPage,
  rowsPerPage,
  handlePatientDetailsClick,
  setPage,
  setRowsPerPage
}: PatientTableProp) {
  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell className={classes.tableHeader} align="left">
                Name
              </TableCell>
              <TableCell className={classes.tableHeader} align="left">
                Date of Birth
              </TableCell>
              <TableCell className={classes.tableHeader} align="left">
                Gender
              </TableCell>
              <TableCell className={classes.tableHeader} align="left">
                Admission Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients
              //Pagination operations
              .slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage
              )
              //Iteration
              .map(patient => (
                <TableRow tabIndex={-1} key={patient.patientId}>
                  <TableCell padding="checkbox">
                    <Tooltip title="Patient Details" placement="top">
                      <IconButton
                        onClick={event =>
                          handlePatientDetailsClick(patient.patientId)
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
                  <TableCell align="left" className={classes.tableText}>
                    {patient.birthDate}
                  </TableCell>
                  <TableCell align="left" className={classes.tableText}>
                    {patient.gender}
                  </TableCell>
                  <TableCell align="left" className={classes.tableText}>
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
        onChangeRowsPerPage={event => setRowsPerPage(+event.target.value)}
      />
    </Paper>
  );
}
