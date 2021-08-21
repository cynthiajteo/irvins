import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Home(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const allProducts = await fetchProducts();
            setProducts(allProducts);
        };
        getProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch('api/products');
        const data = await res.json();
        return data;
    };

    // delete product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/api/products/${id}`);
            window.location = '/';
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <h1>Products</h1>
            <div className='home'>
                {products.map((product) => (
                    <Row style={{ height: '32rem', padding: '1em' }}>
                        <Card key={product._id} style={{ width: '20rem' }}>
                            <Col>
                                <Card.Img src={product.image} />
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <div className='d-flex justify-content-between'>
                                        <div className={'text-success'}>
                                            S$ {product.price}
                                        </div>
                                    </div>
                                    <br />
                                    <NavLink to={`/products/${product._id}`}>
                                        <Button>View</Button>
                                    </NavLink>
                                    <br /> <br />
                                    <Button
                                        className='delete'
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Col>
                        </Card>
                    </Row>
                ))}
            </div>
        </Container>
    );
}

export default Home;
