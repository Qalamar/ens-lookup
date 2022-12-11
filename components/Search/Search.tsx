import 'twin.macro'
import { useQuery } from '@apollo/client'
import { client } from 'pages/_app'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addressRegex, getDate, lookupRegistrantId } from 'utils/helpers'
import { GET_DOMAIN } from 'utils/queries'
import Spinner from '../Spinner'
import { Button, ButtonContainer, DomainInfo, ErrorMessage, Form, Input, InputContainer } from '../Styles'

type FormValues = {
  address: string
}

const Search = () => {
  const [ensDomain, setEnsDomain] = useState('')
  const [registrantAddress, setRegistrantAddress] = useState('')
  const [isResolving, setIsResolving] = useState<boolean>(false)

  const { loading, data, refetch } = useQuery(GET_DOMAIN, {
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
    if (data?.registrations[0]) {
      setIsResolving(true)
      const { id: registrantId } = data.registrations[0].registrant
      lookupRegistrantId(client, registrantId).then(value => {
        setRegistrantAddress(value || registrantId)
        setIsResolving(false)
      })
    }
  }, [data?.registrations[0]])

  const onSubmit = async (data: FormValues) => {
    const addressOnlyRegex = /(\b0x[a-f0-9]{40}\b)/

    if (addressOnlyRegex.test(data.address)) {
      await client.provider.lookupAddress(data.address).then(value => {
        setEnsDomain(value ? value : data.address)
        refetch({ label: value ? value : data.address.replace('.eth', '') })
      })
    } else {
      setEnsDomain(data.address)
      refetch({ label: data.address.replace('.eth', '') })
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Input
            required
            placeholder="Enter an address"
            {...register('address', {
              required: true,
              pattern: addressRegex,
            })}
          />
          {errors.address && <ErrorMessage>Please type a valid ENS domain or address</ErrorMessage>}
        </InputContainer>
        <ButtonContainer>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner /> : <span>Lookup</span>}
          </Button>
        </ButtonContainer>
      </Form>
      {data?.registrations[0] && (
        <DomainInfo>
          <div>
            Registrant: <span tw="font-semibold">{isResolving ? 'Checking ENS...' : registrantAddress}</span>
          </div>
          <div>
            Domain: <span tw="font-semibold">{ensDomain}</span>
          </div>
          <div>
            Registration: <span tw="font-semibold">{getDate(data.registrations[0].registrationDate)}</span>
          </div>
          <div>
            Expiry: <span tw="font-semibold">{getDate(data.registrations[0].expiryDate)}</span>
          </div>
        </DomainInfo>
      )}
    </div>
  )
}

export default Search
