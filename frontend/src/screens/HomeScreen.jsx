import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import { useGetBottomProductsQuery, useGetProductsQuery, useGetTopProductsQuery } from '../slices/productsApiSlice.js';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
  const {pageNumber, keyword} = useParams()
  const {data, isLoading, error} = useGetProductsQuery({keyword, pageNumber})

  const {data: topProducts, isLoading:loadingTop, error:topError} = useGetTopProductsQuery();
  const {data: bottomProducts, isLoading:loadingBottom, error:bottomError} = useGetBottomProductsQuery();

  return (
    <>
      {!keyword ? (
      <Row>
        <Col sm={12} md={6} lg={6} xl={6}>
          <h1>Best of the week👍</h1>
          {loadingTop? <Loader/> : topError? <Message variant='danger'>error?.data?.message || error.error</Message>
          :<ProductCarousel products={topProducts}/>
          }
        </Col>

        <Col sm={12} md={6} lg={6} xl={6}>
          <h1>Worst of the week🤢</h1>
          {loadingBottom? <Loader/> : bottomError? <Message variant='danger'>error?.data?.message || error.error</Message>
          :<ProductCarousel products={bottomProducts}/>
          }
        </Col>
      
      </Row>
      ) 
      
      
      : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>}
      {isLoading ? (
        <Loader/>
      ) : error ? (<Message variant='danger'>
                    {error?.data?.message || error.error}
                  </Message>
      ) : (<>
          <h1>Latest Products!</h1>
          <Row>
              {data.products.map((product) => ( 
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                  </Col>
              ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword?keyword:""}/>
      </>)}

    </>
  );
};

export default HomeScreen