import React from 'react'
import {  Helmet } from 'react-helmet';

// for custom title for each and every page.
//    React Helmet is a component to dynamically manage the document’s head section, like title, 
//    description and meta tags

const MetaData = (props) => {
    return (
        <Helmet>
            <title>{props.title} - ShopIT</title>
        </Helmet>
    )
}

export default MetaData
