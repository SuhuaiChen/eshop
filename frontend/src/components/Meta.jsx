import { Helmet } from "react-helmet-async";

import React from 'react'

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome to eshop",
    description: "We sell the best products for cheap",
    keywords: "electronics, buy electronics, cheap electronics"
}

export default Meta