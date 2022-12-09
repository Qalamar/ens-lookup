import { paginate, truncateEthAddress, getDate } from './helpers'

describe('paginate', () => {
    it('should return the correct page of data', () => {
        const data = [
            {
                "expiryDate": "1702152923",
                "registrationDate": "1670595971",
                "registrant": {
                    "id": "bet88888.eth"
                },
                "domain": {
                    "name": "bet88888.eth"
                }
            }
        ]
        const page1 = paginate(data, 0)

        expect(page1).toEqual([{
            "expiryDate": "1702152923",
            "registrationDate": "1670595971",
            "registrant": {
                "id": "bet88888.eth"
            },
            "domain": {
                "name": "bet88888.eth"
            }
        }])

    })
})

describe('truncateEthAddress', () => {
    it('should truncate the address', () => {
        const address = '0x1234567890abcdefghijklmnopqrstuvwxyzABCD'
        const truncatedAddress = truncateEthAddress(address)
        expect(truncatedAddress).toEqual('0x1234…ABCD')
    })

    it('should not truncate ens addresses', () => {
        const address = 'eth.eth'
        const truncatedAddress = truncateEthAddress(address)
        expect(truncatedAddress).toEqual(address)
    })
})

describe('getDate', () => {
    it('should return the correct date string', () => {
        const timestamp = 1607424000 // December 08, 2020
        const dateString = getDate(timestamp)
        expect(dateString).toEqual('08/12/2020, 10:40:00')
    })
})
