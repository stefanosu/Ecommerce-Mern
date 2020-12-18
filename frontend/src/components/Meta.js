import React from 'react'
import { Helmet } from 'react-helmet'


const Meta = ({ title, description, keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}/>
      <meta name='keyword' content={keywords}/>

    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to ProShop',
  description: 'We sell all the best affordable products', 
  keywords: 'electronics, buy electronics, cutting edge' 
}

export default Meta 