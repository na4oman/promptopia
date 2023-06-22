'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')
  const [userPosts, setUserPosts] = useState([])

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${params?.id}/posts`)
    const data = await response.json()

    setUserPosts(data)
  }

  useEffect(() => {
    if (params?.id) fetchPosts()
  }, [])

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName} personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`}
      data={userPosts}
    />
  )
}

export default UserProfile
