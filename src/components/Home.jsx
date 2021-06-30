/* eslint-disable react-hooks/exhaustive-deps */
import {
    makeStyles,
    Grid,
    Dialog,
    Button
} from '@material-ui/core'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanUpdateProductDataAction, deleteProductAction, getProductsAction } from '../redux/action/productsActions';
//components
import Cards from './Cards'
import CreateProduct from './CreateProduct';
//sweet alert 2
import Swal from 'sweetalert2'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(12, 0, 0, 0)
    }
}))


export default function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);
    const [dialog, setDialog] = useState(false);
    const { updateProductData } = useSelector(state => state.products);
    const [title, setTitle] = useState('Agregar un Producto')
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        img_url: ''
    });
    useEffect(() => {
        dispatch(getProductsAction());
    }, []);
    useEffect(() => {
        console.log(products);
    }, [products]);
    useEffect(() => {
        if (updateProductData.id) {
            setTitle('Actualizar un Producto')
            setNewProduct(updateProductData);
            setDialog(true);
        }
    }, [updateProductData]);
    const closeDialog = () => {
        setNewProduct({
            name: '',
            description: '',
            img_url: ''
        });
        setTitle('Agregar un Producto')
        dispatch(cleanUpdateProductDataAction());
        setDialog(false);
    };
    const handleDeleteProduct = async (id) => {
        const response = await dispatch(deleteProductAction(id));
        if (response.code) {
            Swal.fire({
                icon: 'success',
                title: `${response.message}`
            }).then(result => {
                if (result.isConfirmed) {
                    setDialog(false)
                }
            });
            //refrescar elementos de la base de datos
            dispatch(getProductsAction());
        } else {
            Swal.fire({
                icon: 'error',
                title: `${response.message}`
            });
        }
    }

    const alertDeleteProduct = (id) => {
        Swal.fire({
            title: '¿Deseas eliminar el producto?',
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handleDeleteProduct(id);
                Swal.close()
            } else if (result.isDenied) {
                Swal.fire('Los Cambios no han sido guardados', '', 'info')
                console.log('no eliminar')
            }
        })
    }
    return (
        <Grid container spacing={3} justify='center' className={classes.root}>
            <Dialog
                open={dialog}
                onClose={closeDialog}
                style={{ zIndex: 2 }}

            >
                <CreateProduct
                    newProduct={newProduct}
                    setNewProduct={setNewProduct}
                    dialog={dialog}
                    setDialog={setDialog}
                    title={title}
                    updateProductData={updateProductData}
                />
            </Dialog>
            <Grid item xs={12}>
                <Grid container justify='center'>
                    <Grid item xs={2}>
                        <Button
                            variant='contained'
                            color='primary'
                            fullWidth
                            onClick={() => setDialog(true)}
                            style={{ textTransform: 'none', color: '#fff' }}
                        >
                            Agregar un Producto
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            {products.map(i => (
                <Grid item key={i.id}>
                    <Cards product={i} handleDeleteProduct={alertDeleteProduct} />
                </Grid>
            ))}
        </Grid>
    )
}
