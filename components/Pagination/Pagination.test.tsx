import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Pagination from './Pagination'

describe('Pagination', () => {
  it('renders the pagination buttons', () => {
    const handlePageChange = jest.fn()
    const { getByText } = render(<Pagination length={20} currentPage={0} handlePageChange={handlePageChange} />)
    expect(getByText('1')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
    expect(getByText('Next')).toBeInTheDocument()
  })

  it('updates the current page when the buttons are clicked', () => {
    const handlePageChange = jest.fn()
    const { getByText } = render(<Pagination length={20} currentPage={0} handlePageChange={handlePageChange} />)
    fireEvent.click(getByText('Next'))
    expect(handlePageChange).toHaveBeenCalledWith(1)
  })
})
