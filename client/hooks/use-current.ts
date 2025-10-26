import { IUser } from '@/types'
import { useState } from 'react'

const UseCurrentContact = () => {
	const [currentContact, setCurrentContact] = useState<IUser | null>(null)

	return { currentContact, setCurrentContact }
}

export default UseCurrentContact
