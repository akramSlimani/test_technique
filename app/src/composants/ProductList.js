import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  listItem: {
    marginBottom: theme.spacing(1),
  },
}));

function ProductList() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={classes.root}>
      <h1>Liste des produits</h1>
      <List>
        {products.map((product) => (
          <ListItem key={product._id} className={classes.listItem}>
            <Link to={`/modifier/${product._id}`}>
              <ListItemText primary={product.name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ProductList;
