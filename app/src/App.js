import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListProduit from './composants/ListProduit';
import CreateProductForm from './composants/CreateProductForm';
import EditProductForm from './composants/EditProductForm';
import DeleteProductForm from './composants/DeleteProductForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListProduit} />
        <Route path="/creer" component={CreateProductForm} />
        <Route path="/modifier/:id" component={EditProductForm} />
        <Route path="/supprimer/:id" render={(props) => <DeleteProductForm productId={props.match.params.id} />} />
      </Switch>
    </Router>
  );
}

export default App;
