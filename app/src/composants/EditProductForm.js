import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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

function EditProductForm() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        if (response.status === 200) {
          const product = response.data;
          setName(product.name);
          setType(product.type);
          setPrice(product.price);
        } else {
          console.error('Erreur lors de la récupération des informations du produit');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations du produit:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/products/${id}`, {
        name,
        type,
        price,
      });
      if (response.status === 200) {
        // Mise à jour réussie, rediriger l'utilisateur vers la liste des produits
        history.push('/');
      } else {
        console.error('Erreur lors de la mise à jour du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      if (response.status === 200) {
        // Suppression réussie, rediriger l'utilisateur vers la liste des produits
        history.push('/');
      } else {
        console.error('Erreur lors de la suppression du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };

  return (
    <div className={classes.root}>
      <h1>Modifier le produit</h1>
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
          Modifier
        </Button>
        <Button className={classes.button} variant="contained" color="secondary" onClick={handleDelete}>
          Supprimer
        </Button>
      </form>
    </div>
  );
}

export default EditProductForm;
