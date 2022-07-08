import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from "usehooks-ts";
import {Search} from "../../common/pages/searchBar/searchBarComponents/SearchField";
import {StyledInputBase} from "../../common/pages/searchBar/searchBarComponents/StyledInputBase";
import {SearchIcon} from '../../common/pages/searchBar/searchBarComponents/SearchIcon';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button} from '@mui/material';


type SearchType = {
	onSearchPacks: (packName: string) => void
	nameBtn: string
	callbackBtn: () => void
}


export const SearchAppBar = (props: SearchType) => {

	const [value, setValue] = useState<string>('')
	const debouncedValue = useDebounce<string>(value, 1000)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value)
	}

	useEffect(() => {
		props.onSearchPacks(debouncedValue)
	}, [debouncedValue])


	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position="static" style={{backgroundColor: '#5d2bd0'}}>
				<Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
					<div>
						<Search>
							<SearchIcon>
								<SearchIcon/>
							</SearchIcon>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{'aria-label': 'search'}}
								style={{color: 'grey'}}
								onChange={handleChange}
							/>
						</Search>
					</div>
					<div>
						<Button variant="contained" color="primary"
						        onClick={props.callbackBtn}>
							{props.nameBtn}
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
