import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl } from "react-bootstrap";
import { useGetProductDetailsQuery } from '../slices/productsApiSlice.js';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductScreen = () => {
    const { id: productId} = useParams();
    const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}));
        navigate('/cart')
    };

  return(
    <>
    <Link className="btn btn-light my-3" to="/">Go Back</Link>
    {isLoading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (<Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>

        <Col md={4}>
            <ListGroup variant="flush">
                <ListGroupItem>
                    <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <Rating value={product.rating} 
                    text={`${product.numReviews} reviews`}/>
                </ListGroupItem>
                <ListGroupItem>Price: ${product.price}</ListGroupItem>
            </ListGroup>
        </Col>

        <Col md={3}>
            <Card>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                <strong>{product.CountInStock > 0 ?
                                "In Stock" : "Out Of Stock"}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    
                    {product.CountInStock > 0 && (
                        <ListGroupItem>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                    <FormControl
                                    as='select'
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    >
                                        {[...Array(product.CountInStock).keys()].map((x) =>(
                                            <option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>
                                        ))}
                                    </FormControl>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )}

                    <ListGroupItem>
                        <Button
                            className="btn-block"
                            type="button" 
                            disabled={product.countInStock===0}
                            onClick={addToCartHandler}
                            >
                        Add To Cart
                        </Button>

                    </ListGroupItem>
                </ListGroup>
            </Card>

        </Col>
    </Row>

    )}
    </>
  ) 
}

export default ProductScreen