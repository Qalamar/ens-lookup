import tw, { styled } from 'twin.macro'

const Layout = styled.div`
  ${tw`px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`}
`

const Scrollable = styled.div`
  ${tw`-mx-4 mt-8 overflow-x-auto sm:-mx-6 lg:-mx-8`}
`

const TableContainer = styled.div`
  ${tw`overflow-hidden inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg`}
`

const Table = styled.table`
  ${tw`min-w-full divide-y table-fixed divide-gray-300`}
`

const TableHead = styled.thead`
  ${tw`bg-gray-50`}
`

const TableRow = styled.tr`
  ${tw``}
`

const TableCell = styled.th`
  ${tw`first:(py-3 pl-4 pr-3 sm:pl-6 text-gray-800) last:(py-3 pl-3 pr-4 sm:pr-6 relative) px-3 py-3 text-xs font-medium tracking-wide text-left text-gray-500 uppercase`}
`

const TableBody = styled.tbody`
  ${tw`bg-white divide-y divide-gray-200`}
`
const ExplorerLink = styled.a`
  ${tw`text-indigo-600 transition duration-200 hover:text-indigo-900`}
`

const PaginationContainer = styled.div`
  ${tw`flex items-center justify-center md:justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6`}
`

const PaginationContent = styled.div`
  ${tw`flex flex-1 items-center justify-center md:justify-between`}
`

const PaginationResults = styled.p`
  ${tw`hidden md:inline text-sm text-gray-700`}
`

const PaginationPages = styled.nav`
  ${tw`inline-flex -space-x-px rounded-md shadow-sm isolate`}
`

const PaginationButton = styled.button(({ numbered, active }: { numbered?: boolean; active?: boolean }) => [
  tw`first:rounded-l-md last:rounded-r-md relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 transition duration-200 hover:bg-gray-50 focus:z-20`,
  numbered && tw`px-4`,
  active && tw`z-10 text-indigo-600 border-indigo-500 bg-indigo-50`,
])

const DomainInfo = styled.div`
${tw`mt-10 text-sm flex-col max-w-xs mx-auto flex justify-center`}`

const Form = styled.form`
${tw`sm:flex justify-center my-6`}`

const InputContainer = styled.div`
${tw`flex flex-col space-y-1`}`

const Input = styled.input`
${tw`w-full px-4 py-2 placeholder-gray-400 border border-gray-400 rounded-md focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white sm:max-w-xs transition duration-200`}`

const ErrorMessage = styled.div`
${tw`text-xs text-red-500`}`

const ButtonContainer = styled.div`
${tw`mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0`}`

const Button = styled.button`
${tw`flex items-center disabled:(cursor-wait opacity-50) min-w-[6rem] justify-center w-full px-5 py-2 text-base font-medium text-white bg-indigo-500 transition duration-200 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white`}`

export {
  Layout,
  Scrollable,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ExplorerLink,
  PaginationContainer,
  PaginationContent,
  PaginationPages,
  PaginationButton,
  PaginationResults,
  DomainInfo,
  Form,
  InputContainer,
  Input,
  ErrorMessage,
  ButtonContainer,
  Button
}
