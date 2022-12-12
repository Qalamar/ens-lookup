import { GetRegistrationsQuery } from 'types/queries/graphql'

export const ensDomainRegex = /([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.eth$/g
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

export const paginate = (data: GetRegistrationsQuery['registrations'], pageIndex: number) => {
  var endIndex = Math.min((pageIndex + 1) * 10, data.length)
  return data.slice(Math.max(endIndex - 10, 0), endIndex)
}


export const truncateEthAddress = (address: string) => {
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}

// TODO: Assign correct types to lib unexposed types
export const getDate = (date: any) => {
  return new Date(date * 1000).toLocaleString('en-GB', { timeZone: 'UTC' })
}

export const lookupRegistrantId = async (client: any, id: string) => {
  const lookupResult = await client.provider.lookupAddress(id)
  return lookupResult ? lookupResult : id
}