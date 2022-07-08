import * as React from 'react';
import {useEffect, useState} from 'react';
import styles from './Packs.module.css'
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {
	createPackTC,
	deletePackTC,
	getPacksTC,
	savePageAC,
	saveUserIdAC,
	updatePackTC
} from "../../../reducers/packsReducer";
import {RangeSlider} from "../../common/pages/slider/RangeSlider";
import {SearchAppBar} from "../searchBar/SearchBar";
import {Paginator} from "../../common/pages/pagination/Paginator";
import {Selector} from "../../common/pages/select/Selector";
import Navbar from "../../navbar/Navbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import {Button, IconButton} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {useNavigate} from "react-router-dom";

export const Packs = () => {

	const [isActive, setIsActive] = useState(true)
	const [sortDirection, setSortDirection] = useState(false)

	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const packs = useAppSelector(state => state.packs.cardPacks)
	const page = useAppSelector(state => state.packs.page)
	const pageCount = useAppSelector(state => state.packs.pageCount)
	const user_id = useAppSelector(state => state.profile.userId)
	const loginUserId = useAppSelector(state => state.login.loginUserId)
	const userId = useAppSelector(state => state.packs.userId)
	const min = useAppSelector(state => state.packs.min)
	const max = useAppSelector(state => state.packs.max)

	useEffect(() => {
		getPacksTC()
	}, [])

	const myPacksHandler = () => {
		dispatch(saveUserIdAC(user_id))
		dispatch(getPacksTC({
			user_id: user_id,
			page,
			pageCount,
			sortPacks: `${Number(sortDirection)}` + `updated`,
			min,
			max
		}))
		setIsActive(!isActive)
	}

	const allPacksHandler = () => {
		dispatch(getPacksTC({
			user_id: '',
			page,
			pageCount,
			sortPacks: `${Number(sortDirection)}` + `updated`,
			min,
			max
		}))
		setIsActive(!isActive)
		dispatch(saveUserIdAC(''))

	}

	const onPageChange = (page: number) => {
		dispatch(savePageAC(page))
		dispatch(getPacksTC({
			user_id: userId,
			page,
			pageCount,
			sortPacks: `${Number(sortDirection)}` + `updated`,
			min,
			max
		}))
	}

	const onChangePageCount = (pageCount: number) => {
		dispatch(getPacksTC({
			user_id: userId,
			page,
			pageCount,
			sortPacks: `${Number(sortDirection)}` + `updated`,
			min,
			max
		}))
	}

	const onSearchPacks = (packName: string) => {
		dispatch(getPacksTC({
			user_id: userId,
			packName,
			page,
			pageCount,
			sortPacks: `${Number(sortDirection)}` + `updated`,
			min,
			max
		}))
	}

	const onSortPacks = () => {
		dispatch(getPacksTC({user_id: userId, sortPacks: `${Number(!sortDirection)}` + `updated`, page, pageCount}))
		setSortDirection(!sortDirection)
	}

	const sliderHandler = (min: number, max: number) => {
		dispatch(getPacksTC({
			user_id: userId,
			page,
			pageCount,
			sortPacks: `${Number(sortDirection)}` + `updated`,
			min,
			max
		}))
	}

	const createPackHandler = () => {
		dispatch(createPackTC())
	}

	const learnHandler = (packId: string, packName: string) => {
		navigate(`/cards-page/${packId}/${packName}`)
	}


	return (
		<>
			<Navbar/>

			<div className={styles.container}>
				<div className={styles.sidebar}>
					<div>
						<p className={styles.title}>Show packs cards</p>
						<div className={styles.buttonBlock}>
							<Button className={styles.button} variant={'contained'}
							        disabled={!isActive}
							        color="primary"
							        onClick={myPacksHandler}>
								My
							</Button>
							<Button variant={'contained'} color="primary"
							        disabled={isActive}
							        onClick={allPacksHandler}>
								All
							</Button>
						</div>
					</div>
					<div>
						<p className={styles.title}>Number of cards</p>
						<div className={styles.rangeSlider}>
							<RangeSlider sliderHandler={sliderHandler}/>
						</div>
					</div>
				</div>
				<div className={styles.mainTable}>
					<h3>Packs List</h3>
					<SearchAppBar onSearchPacks={onSearchPacks}
					              nameBtn={'Add New Pack'} callbackBtn={createPackHandler}/>
					<TableContainer component={Paper} className={styles.cardsTable}>
						<Table className={styles.mainCardsTable} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell onClick={onSortPacks} className={styles.headerText}
									           align={'center'}><b>Name</b></TableCell>
									<TableCell onClick={onSortPacks} className={styles.headerText} align={'center'}><b>Cards
										count</b></TableCell>

									<TableCell className={styles.headerSortText}
									           align={'center'}>
										<div className={styles.headerSortText}><b>Updated</b>
											<div><IconButton onClick={onSortPacks} aria-label="arrow" size="small">
												<UnfoldMoreIcon fontSize="inherit"/>
											</IconButton>
											</div>
										</div>

									</TableCell>
									<TableCell onClick={onSortPacks} className={styles.headerTextActive}
									           align={'center'}><b>Author</b></TableCell>
									<TableCell className={styles.headerText} align={'center'}><b>Actions</b></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{packs.map((p) => (
									<TableRow
										key={p._id}
										sx={{'&:last-child td, &:last-child th': {border: 0}}}>
										<TableCell className={styles.tableText} component="th" scope="row">
											{p.name}
										</TableCell>
										<TableCell className={styles.tableText}
										           align={'center'}>{p.cardsCount}</TableCell>
										<TableCell className={styles.tableText}
										           align={'center'}>
											{`${(p.updated).slice(8, 10)}.${(p.updated).slice(5, 7)}.${(p.updated).slice(0, 4)}`}
										</TableCell>
										<TableCell className={styles.tableText}>{p.user_name}</TableCell>
										{(p.user_id === user_id || p.user_id === loginUserId) ?
											<TableCell className={styles.tableText} align={'center'}>
												<div className={styles.iconBlock}>

													<IconButton aria-label="school" size="small"
													            onClick={() => learnHandler(p._id, p.name)}
													>
														<SchoolIcon fontSize="inherit"/>
													</IconButton>

													<IconButton onClick={() => (dispatch(deletePackTC(p._id, {
														user_id: userId,
														page,
														pageCount,
														sortPacks: `${Number(sortDirection)}` + `updated`,
														min,
														max
													})))}
													            aria-label="delete" size="small">
														<DeleteIcon fontSize="inherit"/>
													</IconButton>
													<IconButton onClick={() => {
														dispatch(updatePackTC({_id: p._id, name: "Pack name changed"}, {
															user_id: userId,
															page,
															pageCount,
															sortPacks: `${Number(sortDirection)}` + `updated`,
															min,
															max
														}))
													}}
													            aria-label="delete" size="small">
														<EditIcon fontSize="inherit"/>
													</IconButton>
												</div>
											</TableCell>
											: <TableCell className={styles.tableText} align={'left'}>
												<div className={styles.iconBlock1}>
													<IconButton aria-label="school" size="small"
													            onClick={() => learnHandler(p._id, p.name)}>
														<SchoolIcon fontSize="inherit"/>
													</IconButton>
												</div>
											</TableCell>
										}
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
			</div>
		</>
	);
}
