import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './Packs.module.css'
import {Button, IconButton} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {deletePackTC, getPacksTC, savePageAC, saveUserIdAC} from "../../../reducers/packsReducer";
import {RangeSlider} from "../../common/pages/slider/RangeSlider";
import {SearchAppBar} from "../searchBar/SearchBar";
import {Paginator} from "../../common/pages/pagination/Paginator";
import {Selector} from "../../common/pages/select/Selector";
import Navbar from "../../navbar/Navbar";
import SchoolIcon from '@mui/icons-material/School';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {useNavigate} from "react-router-dom";
import {DeletePackModal} from "./modals/DeletePackModal";
import {AddNewPackModal} from "./modals/AddNewPackModal";
import {UpdatePackModal} from "./modals/UpdatePackModal";

export const Packs = () => {

    const [isActive, setIsActive] = useState(true)
    const [sortDirection, setSortDirection] = useState(false)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const pageTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const user_id = useAppSelector(state => state.profile.userId)
    const loginUserId = useAppSelector(state => state.login.loginUserId)
    const userId = useAppSelector(state => state.packs.userId)
    const min = useAppSelector(state => state.packs.min)
    const max = useAppSelector(state => state.packs.max)


    const sortPacks = `${Number(sortDirection)}updated`

    useEffect(() => {
        dispatch(getPacksTC())
    }, [])

    const myPacksHandler = () => {
        dispatch(saveUserIdAC(user_id))
        dispatch(getPacksTC({
            user_id: user_id || loginUserId,
            page,
            pageCount,
            sortPacks,
            min,
            max
        }))
        setIsActive(!isActive)
    }

    const allPacksHandler = () => {
        dispatch(getPacksTC({
            page,
            pageCount,
            sortPacks,
            min,
            max
        }))
        setIsActive(!isActive)
        dispatch(saveUserIdAC(''))
    }

    const onPageChange = (page: number) => {
        dispatch(savePageAC(page))
        if (userId) {
            dispatch(getPacksTC({
                user_id: userId,
                page,
                pageCount,
                sortPacks,
                min,
                max
            }))

        } else {
            dispatch(getPacksTC({
                page,
                pageCount,
                sortPacks,
                min,
                max
            }))
        }
    }

    const onChangePageCount = (pageCount: number) => {
        if (userId) {
            dispatch(getPacksTC({
                user_id: userId,
                page,
                pageCount,
                sortPacks,
                min,
                max
            }))
        } else {
            dispatch(getPacksTC({
                page,
                pageCount,
                sortPacks,
                min,
                max
            }))
        }
    }

    const onSearchPacks = (packName: string) => {
        if (userId) {
            dispatch(getPacksTC({
                user_id: userId,
                packName,
                page,
                pageCount,
                sortPacks,
                min,
                max
            }))
        } else {
            dispatch(getPacksTC({
                packName,
                page,
                pageCount,
                sortPacks,
                min,
                max
            }))
        }
    }

    const onSortPacks = () => {
        if (userId) {
            dispatch(getPacksTC({user_id: userId, sortPacks, page, pageCount}))
        } else {
            dispatch(getPacksTC({sortPacks, page, pageCount}))
        }
        setSortDirection(!sortDirection)
    }

    const sliderHandler = (min: number, max: number) => {
        if (userId) {
            dispatch(getPacksTC({
                user_id: userId,
                page,
                pageCount,
                sortPacks,
                min,
                max
            }))
        } else {
            dispatch(getPacksTC({
                page,
                pageCount,
                sortPacks,
                min,
                max
            }))
        }

    }


    const goToCardHandler = (packId: string, packName: string) => {
        navigate(`/cards-page/${packId}/${packName}`)
    }

    const goToLearnHandler = (packId: string, packName: string) => {
        navigate(`/learn-page/${packId}/${packName}`)
    }

    const deletePackHandler = (packId: string) => {
        if (userId){
            dispatch(deletePackTC(packId, {
                user_id: userId,
                page,
                pageCount,
                sortPacks,
                min,
                max
            }))
        } else {
            dispatch(deletePackTC(packId, {
                page,
                pageCount,
                sortPacks,
                min,
                max
            }))
        }
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
                                  children={<AddNewPackModal/>}/>

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
                                        <TableCell onClick={() => goToCardHandler(p._id, p.name)}
                                                   className={styles.tableTextLink} component="th" scope="row">
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

                                                    <IconButton disabled={p.cardsCount === 0}
                                                                onClick={() => goToLearnHandler(p._id, p.name)}
                                                                aria-label="school" size="small">

                                                        <SchoolIcon fontSize="inherit"/>
                                                    </IconButton>

                                                    <DeletePackModal handleOperation={() => deletePackHandler(p._id)}
                                                                     packName={p.name}/>

                                                    <UpdatePackModal
                                                        _id={p._id}
                                                        userId={userId}
                                                        page={page}
                                                        pageCount={pageCount}
                                                        sortPacks={sortPacks}
                                                        min={min}
                                                        max={max}
                                                        name={p.name}
                                                    />

                                                </div>
                                            </TableCell>
                                            : <TableCell className={styles.tableText} align={'left'}>
                                                <div className={styles.iconBlock1}>
                                                    <IconButton disabled={p.cardsCount === 0}
                                                                onClick={() => goToLearnHandler(p._id, p.name)}
                                                                aria-label="school" size="small">
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
                            <Paginator onPageChange={onPageChange} pageCount={pageCount} totalCount={pageTotalCount}/>
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