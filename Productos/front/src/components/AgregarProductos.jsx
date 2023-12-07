import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';

function AddProductForm() {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        // Añade aquí más campos si son necesarios
    });

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }

            alert('Producto agregado con éxito');
            // Aquí puedes limpiar el formulario o redirigir al usuario
            setProductData({
                name: '',
                price: 0,
                description: '',
                // Reinicia aquí más campos si son necesarios
            });
        } catch (error) {
            console.error('Hubo un problema con la solicitud de agregar el producto:', error);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Typography variant="h6">Agregar Nuevo Producto</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nombre del Producto"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="price"
                        label="Precio"
                        type="number"
                        value={productData.price}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Descripción"
                        multiline
                        rows={4}
                        value={productData.description}
                        onChange={handleChange}
                    />
                    {/* Añade aquí más campos si son necesarios */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Agregar Producto
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography variant="h6">Vista Previa del Producto</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Nombre: {productData.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Precio: ${productData.price}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Descripción: {productData.description}
                    </Typography>
                    {/* Muestra aquí más campos si son necesarios */}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default AddProductForm;