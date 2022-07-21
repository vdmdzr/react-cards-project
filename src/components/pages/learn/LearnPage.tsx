import React, {useEffect, useState} from 'react'
import {Button, Grid} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import style from '../../common/styles/FormStyles.module.css'
import LinearProgress from "@mui/material/LinearProgress";
import {NavLink, useParams} from "react-router-dom";
import {CardType} from "../../../api/cardsAPI";
import {getCardsTC, setCardGrade} from "../../../reducers/cardsReduser";
import styles from "./Learn.module.css"
import HoverRating from "./Rating";


const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
}

export const LearnPage = () => {

    const {packid, packname} = useParams()

    const dispatch = useAppDispatch()
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [rating, setRating] = useState<number>(0)
    const [error, setError] = useState<boolean>(false)

    const cards = useAppSelector(state => state.cards.cards)
    const status = useAppSelector(state => state.profile.status)


    const [card, setCard] = useState<CardType>({
        answer: '',
        cardsPack_id: '',
        created: '',
        grade: 0,
        question: '',
        shots: 0,
        updated: '',
        user_id: '',
        _id: '',
    });

    useEffect(() => {
        if (first) {
            packid && dispatch(getCardsTC({cardsPack_id: packid, page: 1, pageCount: 1000}));
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));
    }, [dispatch, packid, cards, first]);

    const onSelectRating = (value: number) => {
        setRating(value)
        setError(false)
    }

    const onNext = () => {
        if (rating < 1 || rating > 5) {
            setError(true)
        } else {
            setIsChecked(false)
            setRating(0)
            setError(false)
            dispatch(setCardGrade(rating, card._id))
            setCard(getCard(cards));
        }
    }

    return (
        <div className={style.mainContainer}>
            {status === 'loading' && <LinearProgress/>}

            <Grid container>
                <div className={style.grid}>
                    <Grid item>
                        <div className={style.container}>
                            <div className={styles.learnTitle}>Learn: {packname}</div>
                            <div>
                                <div>
                                    <div className={styles.text}><b>Question:</b>

                                        {(card.question.slice(0,11)==='data:image/') ?
                                           <div><img alt={'photoQuestion'} className={styles.imgQuestion} src={card.question}/></div>
                                            : <div>{card.question}</div>
                                        }

                                    </div>
                                    {!isChecked && (
                                        <div className={styles.buttonBlock}>
                                            <NavLink to={'/packs-page'}>
                                                <Button disabled={status==='loading'} variant={'contained'}
                                                        color={'primary'}>
                                                    Cancel
                                                </Button>
                                            </NavLink>
                                            <Button disabled={status==='loading'} onClick={() => setIsChecked(true)} variant={'contained'}
                                                    color={'primary'}>
                                                Show answer
                                            </Button>
                                        </div>
                                    )}
                                    {isChecked && (
                                        <>
                                            <div><b>Answer:</b>

                                                {card.answer}

                                            </div>
                                            <div className={styles.rate}>
                                                <h3>Rate yourself:</h3>

                                                <HoverRating onSelectRating={onSelectRating}/>
                                            </div>



                                            <div className={styles.buttonBlock}>
                                                <NavLink to={'/packs-page'}>
                                                    <Button variant={'contained'}
                                                            color={'primary'}>
                                                        Cancel
                                                    </Button>
                                                </NavLink>
                                                <Button onClick={onNext} variant={'contained'}
                                                        color={'primary'}>
                                                    next
                                                </Button>
                                            </div>
                                        </>
                                    )}

                                    {error && <div className={styles.error}>Rate yourself before next question!</div>}
                                </div>
                            </div>
                        </div>
                    </Grid>
                </div>
            </Grid>
        </div>
    )
}

