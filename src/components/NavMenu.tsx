import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
  name: User['name']
  canEdit: boolean
}


export default function NavMenu({name, canEdit} : NavMenuProps) {

  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('AUTH-TOKEN')
    queryClient.invalidateQueries({queryKey: ['user']})
  }

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-400">
        <Bars3Icon className='w-8 h-8 text-white ' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        
        {canEdit ? (
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <p className='text-center'>Hi: {name}</p>
            <Link
              to='/profile'
              className='block p-2 hover:text-purple-950'
            >My Profile</Link>
            <Link
              to='/'
              className='block p-2 hover:text-purple-950'
            >My Templates</Link>
            <button
              className='block p-2 hover:text-purple-950'
              type='button'
              onClick={logout}
            >
              Sign out
            </button>
          </div>
        </Popover.Panel>

        ) : (
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink text-center rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <p>Do you have an account?</p>
            <Link
              to='/auth/login'
              className='block p-2 text-red-600 hover:text-red-950'
            >Sing In</Link>
            <p>or</p>
            <Link
              to='/auth/register'
              className='block p-2 text-blue-600 hover:text-purple-950'
            >Create an Account</Link>
          </div>
        </Popover.Panel>
        )}
      </Transition>
    </Popover>
  )
}