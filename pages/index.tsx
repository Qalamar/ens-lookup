import { useQuery } from '@apollo/client'
import Domains from 'components/Domains'
import Pagination from 'components/Pagination'
import Search from 'components/Search'
import Shimmer from 'components/Shimmer'
import { Layout } from 'components/Styles'
import { useEffect, useState } from 'react'
import 'twin.macro'
import { GetRegistrationsQuery } from 'types/queries/graphql'
import { GET_REGISTRATIONS } from 'utils/queries'
import { client } from './_app'

const App = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [formattedData, setFormattedData] = useState<GetRegistrationsQuery['registrations']>()
  const [isResolving, setIsResolving] = useState<boolean>(false)
  const { loading, error, data, fetchMore } = useQuery(GET_REGISTRATIONS, {
    variables: { first: 20, skip: 0 },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    setIsResolving(true)
    if (data) {
      Promise.all(
        structuredClone(data.registrations).map(async object => {
          object.registrant.id = await client.provider
            .lookupAddress(object.registrant.id)
            .then(value => {
              return value ? value : object.registrant.id
            })
          return object
        }),
      ).then(value => {
        setFormattedData(value)
        setIsResolving(false)
      })
    }
  }, [data])

  if (loading || isResolving) return <Shimmer />
  if (error) return `Error! ${error}`

  const handlePageChange = (page: number): void => {
    if (data && data.registrations.length / 10 === page) {
      setIsResolving(true)
      fetchMore({
        variables: {
          first: 10,
          skip: data.registrations.length,
        },
      })
    }
    setCurrentPage(page)
  }

  if (formattedData)
    return (
      <Layout>
        <Search />
        <Domains data={formattedData} currentPage={currentPage} />
        <Pagination
          length={formattedData.length}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Layout>
    )
}

export default App
