import { NetworkStatus, useQuery } from '@apollo/client'
import Pagination from 'components/Pagination'
import Shimmer from 'components/Shimmer'
import {
  Layout,
  Scrollable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from 'components/Styles'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import 'twin.macro'
import { paginate, resolveENS } from 'utils/helpers'
import { GET_REGISTRATIONS } from 'utils/quries'
import { client } from './_app'

const App = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [formattedData, setFormattedData] = useState<any>()
  const { loading, error, data, networkStatus, fetchMore } = useQuery(
    GET_REGISTRATIONS,
    {
      variables: { first: 20, skip: 0 },
      notifyOnNetworkStatusChange: true,
    },
  )

  useEffect(() => {
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
      })
    }
  }, [data])

  if (loading || networkStatus === NetworkStatus.refetch) return <Shimmer />
  if (error) return `Error! ${error}`

  const handlePageChange = (page: number): void => {
    if (data && data.registrations.length / 10 === page)
      fetchMore({
        variables: {
          first: 10,
          skip: data.registrations.length,
        },
      })
    setCurrentPage(page)
  }
  console.log(formattedData)

  if (formattedData)
    return (
      <Layout>
        <Scrollable>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['Registrant', 'Domain', 'Registration', 'Expiry'].map(
                    column => (
                      <TableCell key={column} scope="col">
                        {column}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginate(formattedData, currentPage).map(item => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={item?.domain?.name}
                  >
                    <TableCell>{item?.registrant?.id}</TableCell>
                    <TableCell>{item?.domain?.name}</TableCell>
                    <TableCell>
                      {new Date(
                        item.registrationDate
                          ? item.registrationDate * 1000
                          : '',
                      ).toLocaleString('en-GB', { timeZone: 'UTC' })}
                    </TableCell>
                    <TableCell>
                      {new Date(
                        item.expiryDate ? item.expiryDate * 1000 : '',
                      ).toLocaleString('en-GB', { timeZone: 'UTC' })}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollable>
        <Pagination
          length={formattedData.length}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Layout>
    )
}

export default App
