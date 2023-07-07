import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

function DeleteProductForm({ productId }) {
  const classes = useStyles();
  const history = useHistory();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
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
      <h1>Supprimer le produit</h1>
      <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
}

export default DeleteProductForm;
