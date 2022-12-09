import { gql } from "types/queries"

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

export const GET_DOMAIN = gql(`
  query GetDomain($label: String!) {
    registrations(where: { labelName: $label }) {
        expiryDate
        registrationDate
        registrant {
          id
        }
      }
  }
`)
