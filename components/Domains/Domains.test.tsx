import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Domains from './Domains'

describe('Domains component', () => {
  afterEach(cleanup)

  it('renders the component', () => {
    const data = [
      {
        registrant: { id: '0x123456...' },
        domain: { name: 'example.com' },
        registrationDate: '2022-12-09T12:34:56.789Z',
        expiryDate: '2023-12-09T12:34:56.789Z',
      },
    ]
    const currentPage = 1
    const { container } = render(<Domains data={data} currentPage={currentPage} />)

    expect(container).toBeInTheDocument()
  })

  it('renders the correct table column headers', () => {
    const data = [
      {
        registrant: { id: '0x123456...' },
        domain: { name: 'example.com' },
        registrationDate: '2022-12-09T12:34:56.789Z',
        expiryDate: '2023-12-09T12:34:56.789Z',
      },
    ]
    const currentPage = 1
    const { getByText } = render(<Domains data={data} currentPage={currentPage} />)

    expect(getByText('Registrant')).toBeInTheDocument()
    expect(getByText('Domain')).toBeInTheDocument()
    expect(getByText('Registration')).toBeInTheDocument()
    expect(getByText('Expiry')).toBeInTheDocument()
  })
})
