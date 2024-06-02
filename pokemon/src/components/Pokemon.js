import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles({
  typeTypography: {
    textTransform: "capitalize",
    textAlign: "center",
  },
});

const Pokemon = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(undefined);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => {
        const { data } = response;
        setPokemon(data);
      })
      .catch(() => {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const { front_default } = sprites;

    const spriteClick = () => {
      console.log(`${name} sprite clicked!`);
    };

    return (
      <>
        <Typography variant="h2" className={classes.typeTypography}>
          {`${id}. ${name}`}
        </Typography>
        <Typography className={classes.typeTypography}>
          <img
            onClick={spriteClick}
            src={front_default}
            alt={`${name} sprite`}
          />
        </Typography>
        <Typography className={classes.typeTypography}>
          <p>Species: {species.name}</p>
        </Typography>
        <Typography className={classes.typeTypography}>
          Height: {height}
        </Typography>
        <Typography className={classes.typeTypography}>
          Weight: {weight}
        </Typography>
        <Typography className={classes.typeTypography} variant="h6">
          Types:
        </Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;

          return (
            <Typography key={name} className={classes.typeTypography}>
              {name}
            </Typography>
          );
        })}
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && (
        <Typography>These aren't the Pokemon you're looking for.</Typography>
      )}
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to Pokedex!
      </Button>
    </>
  );
};

export default Pokemon;
