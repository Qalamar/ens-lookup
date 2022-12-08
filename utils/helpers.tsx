import { client } from 'pages/_app'
import { GetRegistrationsQuery } from 'types/__generated__/graphql'
import { publicProvider } from 'wagmi/dist/providers/public'

export const paginate = (
  data: GetRegistrationsQuery['registrations'],
  pageIndex: number,
) => {
  var endIndex = Math.min((pageIndex + 1) * 10, data.length)
  return data.slice(Math.max(endIndex - 10, 0), endIndex)
}

export const resolveENS = (data: GetRegistrationsQuery['registrations']) => {
  // Use the map method to iterate over the array of objects.
  let resolvedData = []

  structuredClone(data).map(async object => {
    // Use the async/await syntax to edit the property asynchronously.
    object.registrant.id = await client.provider
      .lookupAddress(object.registrant.id)
      .then(value => {
        return value ? value : object.registrant.id
      })
    resolvedData.push(object)
  })
  return resolvedData
}
