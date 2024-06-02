import React, { useState, useEffect } from "react";
import PokeLogo from "../images/PokeLogo.png";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  typeTypography: {
    textTransform: "capitalize",
  },
  AppBar: {
    margin: "0",
    padding: "0",
    backgroundColor: "rgb(156, 3, 3)",
  },
  searchCont: {
    margin: "auto",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "-15px",
  },
  searchInput: {
    margin: "auto",
    width: "200px",
    color: "white",
  },

  //textfield input style
  input: {
    color: "white",
    margin: "auto",
  },
  PokeLogo: {
    padding: "0",
    margin: "auto",
    height: "auto",
    width: "250px",
  },
}));

const Pokedex = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={12} sm={6} md={4} key={pokemonId}>
        <Card
          onClick={() => {
            navigate(`/${pokemonId}`);
          }}
        >
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.typeTypography}
            >{`${id}. ${name}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar className={classes.AppBar} position="static">
        <img className={classes.PokeLogo} src={PokeLogo} />
        <Toolbar>
          <div className={classes.searchCont}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              onChange={handleSearchChange}
              className={classes.searchInput}
              InputProps={{ className: classes.input }}
              placeholder="...Pikachu"
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;
