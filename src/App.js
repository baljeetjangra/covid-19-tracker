import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import corona from "./assets/logo/corona.png";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { preetyPrintStat, sortData } from "./util";
import LineGraph from "./components/LineGraph";
import PublicIcon from "@material-ui/icons/Public";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCounteries, setMapCounteries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
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
          setMapCounteries(data);
          setCountries(countries);
        })
        .catch((err) => console.log(err));
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    // fetch country data
    // https://disease.sh/v3/covid-19/countries/[country-code]

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (countryCode === "worldwide") {
          setCountry(countryCode);
          setCountryInfo(data);
          setMapCenter({ lat: 34.80746, lng: -40.4796 });

          setMapZoom(4);
        } else {
          setCountry(countryCode);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
        // setCountry(countryCode),
        // setCountryInfo(data),
        // setMapCenter([data.countryInfo.lat, data.countryInfo.long]),
        // setMapZoom(4)
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h2>Covid-19 Tracker</h2>
          <img className="app__logo" src={corona} alt="" />
          <Button
            target="_blank"
            href="https://github.com/baljeetjangra/covid-19-tracker"
            variant="outlined"
            color="primary"
          >
            Give a Star
          </Button>

          <FormControl className="app__dropdown">
            <Select
              value={country}
              onChange={onCountryChange}
              variant="outlined"
              style={{ background: "#231C4F", color: "#fff" }}
            >
              <MenuItem
                style={{ background: "#231C4F", color: "#fff" }}
                value="worldwide"
              >
                <PublicIcon />
                Worldwide
              </MenuItem>
              {countries.map((country) => (
                <MenuItem
                  style={{ background: "#231C4F", color: "#fff" }}
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
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="CoronaVirus Cases"
            cases={preetyPrintStat(countryInfo.todayCases)}
            total={preetyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={preetyPrintStat(countryInfo.todayRecovered)}
            total={preetyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={preetyPrintStat(countryInfo.todayDeaths)}
            total={preetyPrintStat(countryInfo.deaths)}
          />
        </div>
        <Map
          casesTypes={casesType}
          counteries={mapCounteries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card
        style={{ backgroundColor: "#231C4F", color: "#fff" }}
        className="app__right"
      >
        <CardContent>
          <h3>Live cases by country</h3>
          <Table counteries={tableData} />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
