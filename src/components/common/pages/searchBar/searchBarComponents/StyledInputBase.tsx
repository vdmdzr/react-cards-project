import {styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: 'secondary',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '40ch'
			},
		},
	},
}));