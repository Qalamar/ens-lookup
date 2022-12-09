import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Search from './Search'

describe('Search', () => {
  it('render the form', () => {
    const { getByPlaceholderText, getByText } = render(<Search />)
    expect(getByPlaceholderText('Enter an address')).toBeInTheDocument()
    expect(getByText('Lookup')).toBeInTheDocument()
  })

  it('validate the form', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<Search />)
    fireEvent.click(getByText('Lookup'))

    const error = await findByText('Please type a valid ENS domain or address')
    expect(error).toBeInTheDocument()
  })

  it('submit the form', async () => {
    const { getByPlaceholderText, getByText } = render(<Search />)
    fireEvent.change(getByPlaceholderText('Enter an address'), {
      target: { value: 'domain.eth' },
    })
    fireEvent.click(getByText('Lookup'))
    // Add assertions to check that the data is being fetched and displayed correctly
  })
})
