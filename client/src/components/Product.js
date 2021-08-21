import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Col, Row, Container } from 'react-bootstrap';

function Product(props) {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState([]);
    const [product, setProduct] = useState({});

    useEffect(() => {
        async function getProduct() {
            const selectedProduct = await axios.get(`/api/products/${id}`);
            console.log(selectedProduct.data);
            setProduct(selectedProduct.data);
        }

        getProduct();
    }, []);

    const editProduct = async (e) => {
        try {
            const response = await axios.put(`/api/products/${id}`, {
                name: name,
                price: price,
                description: description,
                image: image,
                tags: tags,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        editProduct();
        window.location = `/products/${id}`;
    };

    return (
        <Container>
            <h1>{product.name}</h1>
            <Row className='singleProduct'>
                <Col>
                    <Card className='singleCard'>
                        <Card.Img
                            src={product.image}
                            alt={product.name}
                            style={{ height: '30em' }}
                        />
                        <Card.Body>
                            <p>{product.description}</p>
                            <p> Price: S$ {product.price}</p>
                            <p> Tags: {product.tags}</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col
                    className='edit-form'
                    style={{ width: '46%', height: '80%' }}
                >
                    <form className='editForm' onSubmit={onSubmit}>
                        <div className='form-control'>
                            <Row>
                                <label>Name</label>
                            </Row>
                            <input
                                type='text'
                                placeholder={product.name}
                                value={name}
                                required={true}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <Row>
                                <label>Price (SGD)</label>
                            </Row>
                            <input
                                type='number'
                                placeholder={product.price}
                                value={price}
                                min={0.0}
                                step={0.01}
                                required={true}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <Row>
                                <label>Description</label>
                            </Row>
                            <input
                                id='description'
                                type='text'
                                placeholder={product.description}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <Row>
                                <label>Image</label>
                            </Row>
                            <input
                                type='text'
                                placeholder={product.image}
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <Row>
                                <label>Tags</label>
                            </Row>

                            <input
                                type='text'
                                placeholder={product.tags}
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                        <input
                            type='submit'
                            id='submit-btn'
                            value='Update!'
                            className='btn btn-block'
                        />
                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default Product;
