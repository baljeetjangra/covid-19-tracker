import React from "react";
import "../assets/css/InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="infobox">
      <CardContent>
        <Typography className="infobox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infobox__cases">{cases}</h2>
        <Typography className="infobox__total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
