import React from "react";
import "../assets/css/InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

const InfoBox = ({ title, isRed, active, cases, total, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      style={{ backgroundColor: "#231C4F", color: "#fff" }}
      className={`infobox ${active && "infobox__selected"} ${
        isRed && "infobox__red"
      } `}
    >
      <CardContent>
        <Typography className="infobox__title" color="white">
          {title}
        </Typography>
        <h2 className={`infobox__cases ${!isRed && "infobox__greenStat"}`}>
          {cases}
        </h2>
        <Typography className="infobox__total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
