import {
    makeStyles,
    Grid,
    Typography,
    Button
} from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { createProductAction, getProductsAction, updateProductAction } from '../redux/action/productsActions';
import { useDispatch } from 'react-redux';
//sweet alert 2
import Swal from 'sweetalert2'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 10, 4, 10)
    },
    button: {
        textTransform: 'none',
        color: '#fff'
    }
}))

function CreateProduct({ dialog, setDialog, newProduct, setNewProduct, title, updateProductData }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { name, description, img_url } = newProduct;
    const handleChange = ({ target }) => {
        setNewProduct({
            ...newProduct,
            [target.name]: target.value
        });
    };
    const handleSaveProduct = async () => {
        const response = await dispatch(createProductAction(newProduct));
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
            //limpia state inicial
            setNewProduct({
                name: '',
                description: '',
                img_url: ''
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: `${response.message}`
            });
        }
    }

    const handleUpdateProduct = async () => {
        const response = await dispatch(updateProductAction(newProduct));
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


    return (
        <>
            <Grid container className={classes.root}>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <Typography variant='h4' align='center'>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            label='Nombre de Producto'
                            fullWidth
                            size='small'
                            name='name'
                            value={name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            label='Descripción'
                            fullWidth
                            size='small'
                            name='description'
                            value={description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            label='Ruta de Imagen'
                            fullWidth
                            size='small'
                            name='img_url'
                            value={img_url}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {updateProductData.id ?
                            <Button
                                fullWidth
                                className={classes.button}
                                variant='contained'
                                color='primary'
                                onClick={handleUpdateProduct}
                            >
                                <Typography variant='h6'>
                                    Actualizar
                                </Typography>
                            </Button>
                            :
                            <Button
                                fullWidth
                                className={classes.button}
                                variant='contained'
                                color='primary'
                                onClick={handleSaveProduct}
                            >
                                <Typography variant='h6'>
                                    Guardar
                                </Typography>
                            </Button>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            onClick={() => setNewProduct({
                                name: '',
                                description: '',
                                img_url: ''
                            })}
                        >
                            <Typography variant='h6'>
                                Borrar
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CreateProduct
