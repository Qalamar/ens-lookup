import {
  Scrollable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from 'components/Styles'
import { motion } from 'framer-motion'
import 'twin.macro'
import { paginate, truncateEthAddress } from 'utils/helpers'

interface DomainsProps {
  data: any
  currentPage: number
}
const Domains = ({ data, currentPage }: DomainsProps) => {
  return (
    <Scrollable>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['Registrant', 'Domain', 'Registration', 'Expiry'].map(column => (
                <TableCell key={column} scope="col">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginate(data, currentPage).map(item => (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={item?.domain?.name}
              >
                <TableCell title={item?.registrant?.id}>
                  {truncateEthAddress(item?.registrant?.id)}
                </TableCell>
                <TableCell>{item?.domain?.name}</TableCell>
                <TableCell>
                  {new Date(
                    item.registrationDate ? item.registrationDate * 1000 : '',
                  ).toLocaleString('en-GB', { timeZone: 'UTC' })}
                </TableCell>
                <TableCell>
                  {new Date(item.expiryDate ? item.expiryDate * 1000 : '').toLocaleString('en-GB', {
                    timeZone: 'UTC',
                  })}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollable>
  )
}

export default Domains
