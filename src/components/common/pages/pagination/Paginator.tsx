import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


type PaginatorPropsType = {
    onPageChange: (page: number) => void
    totalCount: number
    pageCount: number
}

export const Paginator = (props: PaginatorPropsType) => {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        props.onPageChange(value)
    };

    return (
        <Stack spacing={10}>
            <Pagination
                count={Math.ceil(props.totalCount / props.pageCount)}
                defaultPage={1}
                color="primary"
                onChange={handleChange}/>
        </Stack>
    );
}