import { TablePagination } from 'react-pagination-table';
import React from 'react';

const PaginationTable = ({ tableHeader, data }) => {
    return (
        <div className="pagination-table">
            <TablePagination
                className="react-pagination-table"
                headers={tableHeader}
                data={data}
                columns="country.nationalState.city.areas"
                perPageItemCount={3}
                totalCount={data.length}
                arrayOption={[["size", 'all', ' ']]}
            />
        </div>
    )
}

export default PaginationTable;