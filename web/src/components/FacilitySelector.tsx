import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

type FacilitySelectorProps = {
  facilities: Array<Facility>;
  classes: any;
  selectedFacility: number;
  handleFacilityChange: any;
};

export default function FacilitySelector({
  facilities,
  classes,
  selectedFacility,
  handleFacilityChange
}: FacilitySelectorProps) {
  return (
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
  );
}
