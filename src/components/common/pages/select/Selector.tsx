import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {Select, SelectChangeEvent} from "@mui/material";

type SelectorType = {
	onChangePageCount: (perPage: number) => void
	value: number
}
export const Selector = (props: SelectorType) => {


	const handleChange = (event: SelectChangeEvent) => {
		props.onChangePageCount(+event.target.value)
	};

	return (
		<FormControl sx={{m: 1, minWidth: 50}} size="small">
			<Select
				value={String(props.value)}
				defaultValue={String(props.value)}
				onChange={handleChange}
				displayEmpty
				style={{backgroundColor: 'white', height: '35px'}}
			>
				<MenuItem style={{display: 'flex', justifyContent: 'center'}} value={10}>10</MenuItem>
				<MenuItem style={{display: 'flex', justifyContent: 'center'}} value={20}>20</MenuItem>
				<MenuItem style={{display: 'flex', justifyContent: 'center'}} value={30}>30</MenuItem>
			</Select>
		</FormControl>
	);
}
