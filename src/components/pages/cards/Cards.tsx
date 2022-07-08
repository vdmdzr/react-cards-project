import * as React from 'react';
import {useEffect, useState} from 'react';
import style from './Cards.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {addCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../../reducers/cardsReduser";
import Navbar from "../../navbar/Navbar";
import styles from "../packs/Packs.module.css";
import {Paginator} from "../../common/pages/pagination/Paginator";
import {Selector} from "../../common/pages/select/Selector";
import {SearchAppBar} from "../searchBar/SearchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';


export const Cards = React.memo(() => {

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const {packid, packname} = useParams()

	const page = useAppSelector(state => state.cards.page)
	const pageCount = useAppSelector(state => state.cards.pageCount)
	const cards = useAppSelector(state => state.cards.cards)

	useEffect(() => {
		if (packid) {
			dispatch(getCardsTC({cardsPack_id: packid}))
		}
	}, [])

	const navigateBackHandler = () => {
		navigate('/packs-page')
	}

	const valueRating = 4

	const handlerAddBtn = () => {
		if (packid) {
			dispatch(addCardTC({cardsPack_id: packid}))
		}
	}

	const handlerDeleteCard = (cardId: string) => {
		if (packid) {
			dispatch(deleteCardTC(packid, cardId))
		}
	}

	const handlerUpdateCard = (cardId: string) => {
		if (packid) {
			dispatch(updateCardTC({_id: cardId, question: 'update name card'}, packid))
		}
	}

	const [sortUpdate, setSortUpdate] = useState(false)//для сортировки по update

	const handleSortByUpdate = () => {
		let sortUpdateStr
		sortUpdate ? sortUpdateStr = '0updated' : sortUpdateStr = '1updated'
		if (packid) {
			dispatch(getCardsTC({
				cardsPack_id: packid,
				sortCards: sortUpdateStr,
				page,
				pageCount
			}))
		}
		setSortUpdate(!sortUpdate)
	}

	const onPageChange = (page: number) => {
		if (packid) {
			dispatch(getCardsTC({
				cardsPack_id: packid,
				page,
				pageCount,
				sortCards: `${Number(sortUpdate)}updated`,
			}))
		}
	}

	const onChangePageCount = (pageCount: number) => {
		if (packid) {
			dispatch(getCardsTC({
				cardsPack_id: packid,
				page,
				pageCount,
				sortCards: `${Number(sortUpdate)}updated`,
			}))
		}
	}

	const onSearchPacks = (cardQuestion: string) => {
		if (packid) {
			dispatch(getCardsTC({
				cardsPack_id: packid,
				cardQuestion,
				page,
				pageCount,
				sortCards: `${Number(sortUpdate)}updated`,
			}))
		}
	}

	return (
		<>
			<Navbar/>
			<div className={style.container}>

				<div className={style.back}>
					<ArrowBackIcon onClick={navigateBackHandler} className={style.arrowBackIcon}/>
					<p>{packname}</p>
				</div>

				<TableContainer className={style.tableContainer} elevation={3} component={Paper}>

					<SearchAppBar onSearchPacks={onSearchPacks} nameBtn={'Add Card'} callbackBtn={handlerAddBtn}/>

					<Table aria-label="simple table">

						<TableHead>
							<TableRow>
								<TableCell sx={{'font-weight': 'bold'}}>Question</TableCell>
								<TableCell sx={{'font-weight': 'bold'}} align="right">Answer</TableCell>

								<TableCell className={style.updated} sx={{'font-weight': 'bold'}} align={'right'}>
									<div className={styles.headerSortText}><b>Updated</b>
										<div>
											<IconButton onClick={handleSortByUpdate} aria-label="arrow" size="small">
												<UnfoldMoreIcon fontSize="inherit"/>
											</IconButton>
										</div>
									</div>
								</TableCell>

								<TableCell sx={{'font-weight': 'bold'}} align="right">Grade</TableCell>
								<TableCell sx={{'font-weight': 'bold'}} align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>

							{cards.map((card) => (
								<TableRow
									key={card.cardsPack_id}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell component="th" scope="row">{card.question}</TableCell>
									<TableCell align="right">{card.answer}</TableCell>
									<TableCell align="right">{
										`${(card.updated).slice(8, 10)}.${(card.updated).slice(5, 7)}.${(card.updated).slice(0, 4)}`
									}</TableCell>
									<TableCell align="right">
										<Rating name="read-only" value={valueRating} size={"small"} readOnly/>
									</TableCell>

									<TableCell align="right">

										<IconButton onClick={() => handlerDeleteCard(card._id)}
										            aria-label="delete" size="small">
											<DeleteIcon fontSize="inherit"/>
										</IconButton>

										<IconButton onClick={() => handlerUpdateCard(card._id)}
										            aria-label="edit" size="small">
											<EditIcon fontSize="inherit"/>
										</IconButton>

									</TableCell>

								</TableRow>
							))}
						</TableBody>

					</Table>
				</TableContainer>

				<div className={styles.paginatorBlock}>
					<div className={styles.paginator}>
						<Paginator onPageChange={onPageChange}/>
					</div>
					<div className={styles.selector}>
						Show
						<Selector value={pageCount} onChangePageCount={onChangePageCount}/>
						Packs per page
					</div>
				</div>

			</div>
		</>
	)
})

