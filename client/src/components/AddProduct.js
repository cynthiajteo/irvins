import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState([]);

    const addProduct = async () => {
        try {
            const response = await axios.post('/api/products', {
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
        if (!name || !price) {
            alert('please input details');
            return;
        }
        addProduct();

        setName('');
        setPrice('');
        setDescription('');
        setImage('');
        setTags([]);
        window.location = '/';
    };

    return (
        <Container>
            <Row className='justify-content-center text-center add-form'>
                <h1>Add Product</h1>
                <Col md={8}>
                    <Form onSubmit={onSubmit}>
                        <div className='form-floating lg-2'>
                            <Row>
                                <label>Name</label>
                            </Row>
                            <input
                                type='text'
                                placeholder='name'
                                value={name}
                                required={true}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='form-floating mb-4'>
                            <Row>
                                <label>Price</label>
                            </Row>
                            <input
                                type='number'
                                placeholder='price'
                                value={price}
                                min={0.0}
                                step={0.01}
                                required={true}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className='form-floating mb-4'>
                            <Row>
                                <label>Description</label>
                            </Row>
                            <input
                                id='description'
                                type='text'
                                placeholder='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className='form-floating mb-4'>
                            <Row>
                                <label>Image</label>
                            </Row>
                            <input
                                type='text'
                                placeholder='image link'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>

                        <div className='form-floating mb-4'>
                            <Row>
                                <label>Tags</label>
                            </Row>
                            <input
                                type='text'
                                placeholder='tags'
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>

                        <input
                            type='submit'
                            id='submit-btn'
                            value='Add Product'
                            className='btn btn-block'
                        />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddProduct;
