import { gql } from 'types/__generated__/gql';

export const GET_REGISTRATIONS = gql(`
  query GetRegistrations($first: Int!, $skip: Int!) {
    registrations(where: { labelName_not: null }, orderBy: registrationDate, orderDirection: desc, first: $first, skip: $skip) {
        expiryDate
        registrationDate
        registrant {
          id
        }
        domain {
          name
        }
      }
  }
`)