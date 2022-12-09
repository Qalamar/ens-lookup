import { useQuery } from '@apollo/client'
import { client } from 'pages/_app'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'twin.macro'
import { GET_DOMAIN } from 'utils/queries'
import Spinner from './Spinner'

type FormValues = {
  address: string
}

const Search = () => {
  const [ensDomain, setEnsDomain] = useState('')
  const [registrantAddress, setRegistrantAddress] = useState('')

  const { loading, error, data, refetch } = useQuery(GET_DOMAIN, {
    variables: { label: '' },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  useEffect(() => {
    data?.registrations[0] &&
      client.provider
        .lookupAddress(data?.registrations[0].registrant.id)
        .then(value =>
          value
            ? setRegistrantAddress(value)
            : setRegistrantAddress(data?.registrations[0].registrant.id),
        )
  }, [data?.registrations[0]])

  const onSubmit = async (data: FormValues) => {
    if (data.address.match(/(\b0x[a-f0-9]{40}\b)/)) {
      await client.provider.lookupAddress(data.address).then(value => {
        if (value) {
          setEnsDomain(value)
          refetch({ label: value })
        }
      })
    } else {
      setEnsDomain(data.address)
      refetch({ label: data.address.replace('.eth', '') })
    }
  }

  console.log(registrantAddress)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} tw="sm:flex justify-center my-6">
        <div tw="flex flex-col space-y-1">
          <input
            required
            tw="w-full px-4 py-3 placeholder-gray-400 border border-gray-400 rounded-md focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white sm:max-w-xs transition duration-200"
            placeholder="Enter an address"
            {...register('address', {
              required: true,
              pattern:
                /^(0x[a-fA-F0-9]{40})|([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.eth$/g,
            })}
          />
          {errors.address && (
            <p tw="text-xs text-red-500">Please type a valid ENS domain or address</p>
          )}
        </div>
        <div tw="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
          <button
            type="submit"
            disabled={loading}
            tw="flex items-center disabled:(cursor-wait opacity-50) min-w-[6rem] justify-center w-full px-5 py-3 text-base font-medium text-white bg-indigo-500 transition duration-200 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
          >
            {loading ? <Spinner /> : <span>Lookup</span>}
          </button>
        </div>
      </form>
      {data?.registrations[0] && (
        <div tw="mt-10 text-sm flex-col max-w-md mx-auto flex justify-center">
          <div>
            Registrant: <span tw="font-semibold">{registrantAddress}</span>
          </div>
          <div>
            Domain: <span tw="font-semibold">{ensDomain}</span>
          </div>
          <div>
            Registration:{' '}
            <span tw="font-semibold">
              {new Date(
                data.registrations[0].registrationDate
                  ? data.registrations[0].registrationDate * 1000
                  : '',
              ).toLocaleString('en-GB', { timeZone: 'UTC' })}
            </span>
          </div>
          <div>
            Expiry:{' '}
            <span tw="font-semibold">
              {new Date(
                data.registrations[0].expiryDate ? data.registrations[0].expiryDate * 1000 : '',
              ).toLocaleString('en-GB', {
                timeZone: 'UTC',
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
