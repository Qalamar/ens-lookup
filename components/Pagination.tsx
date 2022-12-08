import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  PaginationButton,
  PaginationContainer,
  PaginationContent,
  PaginationPages,
  PaginationResults,
} from './Styles'

interface PaginationProps {
  length: any
  currentPage: number
  handlePageChange: any
}

const Pagination = ({ length, currentPage, handlePageChange }: PaginationProps) => {
  return (
    <PaginationContainer>
      <PaginationContent>
        <PaginationResults>
          <span tw="font-medium">{length}</span> results in total
        </PaginationResults>
        <div>
          <PaginationPages aria-label="Pagination">
            <PaginationButton onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}>
              <span>Previous</span>
              <ChevronLeftIcon tw="w-5 h-5" aria-hidden="true" />
            </PaginationButton>
            {/* 10 transactions per page */}
            {Array.from(Array(length / 10).keys()).map(page => (
              <PaginationButton
                numbered
                onClick={() => handlePageChange(page)}
                active={currentPage === page}
                key={page}
              >
                {page + 1}
              </PaginationButton>
            ))}
            <PaginationButton onClick={() => handlePageChange(currentPage + 1)}>
              <span>Next</span>
              <ChevronRightIcon tw="w-5 h-5" aria-hidden="true" />
            </PaginationButton>
          </PaginationPages>
        </div>
      </PaginationContent>
    </PaginationContainer>
  )
}

export default Pagination
