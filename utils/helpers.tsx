import { client } from 'pages/_app'
import { GetRegistrationsQuery } from 'types/queries/graphql'

export const paginate = (data: GetRegistrationsQuery['registrations'], pageIndex: number) => {
  var endIndex = Math.min((pageIndex + 1) * 10, data.length)
  return data.slice(Math.max(endIndex - 10, 0), endIndex)
}

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

export const truncateEthAddress = (address: string) => {
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}

export const resolveENS = async (address: string) => {
  await client.provider.lookupAddress(address).then(value => {
    return value ? value : address
  })
}
