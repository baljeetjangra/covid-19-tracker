import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import corona from "./assets/logo/corona.png";
import InfoBox from "./components/InfoBox";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Map from "./components/Map";
import Table from "./components/Table";
import { sortData } from "./util";
import LineGraph from "./components/LineGraph";
import PublicIcon from "@material-ui/icons/Public";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    // api request send
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
          }));
          const soretedData = sortData(data);
          setTableData(soretedData);
          setCountries(countries);
        })
        .catch((err) => console.log(err));
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    // fetch country data
    // https://disease.sh/v3/covid-19/countries/[country-code]

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <img className="app__logo" src={corona} alt="" />

          <FormControl className="app__dropdown">
            <Select
              value={country}
              onChange={onCountryChange}
              variant="outlined"
              style={{ background: "#fff" }}
            >
              <MenuItem value="worldwide">
                <PublicIcon />
                Worldwide
              </MenuItem>
              {countries.map((country) => (
                <MenuItem
                  className="app__dropdownCountries"
                  value={country.value}
                >
                  <img
                    className="app__dropdownFlag"
                    src={country.flag}
                    alt=""
                  />
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="CoronaVirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map />
      </div>
      <Card
        style={{ backgroundColor: "#231C4F", color: "#fff" }}
        className="app__right"
      >
        <CardContent>
          <h3>Live cases by country</h3>
          <Table counteries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
