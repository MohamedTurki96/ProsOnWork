import React from 'react'

import HomeHeader from '../home/header/home-header'
import FooterOne from '../home/home-one/footer-one'

import BlogRoutes from './blog.routes'

const Blog = () => {
  return (
    <>
      <HomeHeader type={2} />
      <BlogRoutes />
      <FooterOne />
    </>
  )
}

export default Blog
