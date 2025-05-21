import React from 'react'
import BlogCarousel from '../components/BlogCarousel'
import BlogMenu from '../components/BlogMenu'
import Hero from '../components/Hero'

export default function Home() {
  return (
          <div>
            <Hero />
          <BlogCarousel />
          <BlogMenu />
          </div>
  )
}
