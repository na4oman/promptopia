'use client'

import React, { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data?.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])

  // Search states
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const filterPrompts = searchtext => {
    const regex = new RegExp(searchtext, 'i') // 'i' flag for case-insensitive search
    return posts.filter(
      post =>
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
    )
  }

  const handleSearchChange = e => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = tagName => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setSearchResults(searchResult)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          required
          className='search_input peer'
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
