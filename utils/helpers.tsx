import { GetRegistrationsQuery } from 'types/__generated__/graphql'

export const paginate = (data: GetRegistrationsQuery['registrations'], pageIndex: number) => {
  var endIndex = Math.min((pageIndex + 1) * 10, data.length)
  return data.slice(Math.max(endIndex - 10, 0), endIndex)
}
