import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useDebounce} from "usehooks-ts";
import {Search} from "../../common/pages/searchBar/searchBarComponents/SearchField";
import {StyledInputBase} from "../../common/pages/searchBar/searchBarComponents/StyledInputBase";
import {SearchIcon} from '../../common/pages/searchBar/searchBarComponents/SearchIcon';

type SearchType = {
	onSearchPacks: (packName: string) => void
	searchCallback: (value: string)=>void
	children: React.ReactNode
}

export const SearchAppBar = (props: SearchType) => {

	const [value, setValue] = useState<string>('')
	const [firstRender, setFirstRender]=useState(true)
	const debouncedValue = useDebounce<string>(value, 1000)


	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value)
	}

	useEffect(()=>{
		setFirstRender(false)
	},[])

	useEffect(() => {
		if(!firstRender) {
			props.onSearchPacks(value)
			props.searchCallback(value)
		}
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
						{props.children}
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}