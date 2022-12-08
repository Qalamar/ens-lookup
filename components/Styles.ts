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
  ${tw`min-w-full divide-y divide-gray-300`}
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
    PaginationResults
}
