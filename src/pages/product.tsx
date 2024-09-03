import React, { Fragment } from "react";

// View Import
import Product from "../views/Authentication/Product/index";

// Next JS Imports
import Head from "next/head";

const product = () => {
  return (
    <Fragment>
      <Head>
        <title>Product</title>
      </Head>
      <Product />
    </Fragment>
  );
};

export default product;
