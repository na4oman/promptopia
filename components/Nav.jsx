'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession()

  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [providers, setProviders] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setUpProviders()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex flex-center gap-2'>
        <Image
          src='/assets/images/logo.svg'
          alt='Promptopia logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {!session?.user && (
          <button type='button' className='black_btn' onClick={signIn}>
            Sign in
          </button>
        )}
        {session?.user && (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <button type='button' className='outline_btn' onClick={signOut}>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user.image}
                alt='profile'
                width={37}
                height={37}
                className='rounded-full'
              />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        <div className='flex'>
          {session?.user && (
            <Image
              src={session?.user?.image}
              alt='profile'
              width={37}
              height={37}
              className='rounded-full'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
          )}
          {!session?.user && (
            <button type='button' className='black_btn' onClick={signIn}>
              Sign in
            </button>
          )}
        </div>

        {/* Dropdown */}
        {toggleDropdown && (
          <div className='dropdown'>
            <Link
              className='dropdown_link'
              href='/profile'
              onClick={() => setToggleDropdown(false)}
            >
              My Profile
            </Link>
            <Link
              className='dropdown_link'
              href='/create-prompt'
              onClick={() => setToggleDropdown(false)}
            >
              Create Prompt
            </Link>
            <button
              type='button'
              className='mt-5 w-full black_btn'
              onClick={() => {
                setToggleDropdown(false)
                signOut()
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
