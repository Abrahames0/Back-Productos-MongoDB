import React, { useState } from 'react';
import { useFetch } from './useFetch'; 
import { CircularProgress, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductList() {
    const { data: products, loading, error, setData } = useFetch({ url: 'http://localhost:4000/products' });
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setOpenEditDialog(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        try {
            const response = await fetch(`http://localhost:4000/products/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            // Actualiza el estado para reflejar la eliminación
            setData(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }
};

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setCurrentProduct(null);
  };

  const handleSaveEdit = async () => {
    try {
        const response = await fetch(`http://localhost:4000/products/${currentProduct._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentProduct),
        });        
  
      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }
  
      const updatedProducts = products.map(product => 
        product.id === currentProduct.id ? currentProduct : product
      );
      setData(updatedProducts);
  
      handleCloseDialog();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      // Manejar el error en la interfaz de usuario
      handleCloseDialog();
    }
  };  

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Paper style={{ padding: 20, margin: 20 }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: 20, margin: 20 }}>
      <Typography variant="h4" style={{ marginBottom: 20 }}>Lista de Productos</Typography>
      <List>
        {products.map(product => (
          <ListItem key={product.id}>
            <ListItemText primary={product.name} secondary={`$${product.price}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(product)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(product._id)}>
                <DeleteIcon />
            </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {openEditDialog && (
        <Dialog open={openEditDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Editar Producto</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre del Producto"
              type="text"
              fullWidth
              value={currentProduct?.name || ''}
              onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
            />
            <TextField
              margin="dense"
              id="price"
              label="Precio"
              type="number"
              fullWidth
              value={currentProduct?.price || ''}
              onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
            />
            {/* Agrega más campos según sea necesario */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
}

export default ProductList;