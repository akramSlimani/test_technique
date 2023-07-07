import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(1),
  },
}));

function CreateProductForm() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/products', {
        name,
        type,
        price,
      });

      if (response.status === 201) {
        // Succès, réinitialiser les valeurs du formulaire
        setName('');
        setType('');
        setPrice('');
        console.log('Produit créé avec succès!');
      } else {
        console.error('Erreur lors de la création du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
    }
  };

  return (
    <div className={classes.root}>
      <h1>Créer un produit</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Nom du produit"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <TextField
          className={classes.textField}
          label="Type du produit"
          value={type}
          onChange={(event) => setType(event.target.value)}
          required
        />
        <TextField
          className={classes.textField}
          label="Prix du produit"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <Button className={classes.button} type="submit" variant="contained" color="primary">
          Créer
        </Button>
      </form>
    </div>
  );
}

export default CreateProductForm;
