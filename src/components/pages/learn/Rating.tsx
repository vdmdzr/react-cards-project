import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import styles from "./Learn.module.css"


const labels: { [index: string]: string } = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 0 ? 's' : ''}, ${labels[value]}`;
}

type RatingPropsType = {
    onSelectRating: (value: number) => void
}

export default function HoverRating(props: RatingPropsType) {
    const [value, setValue] = React.useState<number | null>(0);
    const [hover, setHover] = React.useState(-1);

    return (
        <div className={styles.rating}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Rating
                    name="hover-feedback"
                    value={value}
                    size={'large'}
                    precision={1}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        if (newValue) {
                            props.onSelectRating(newValue)
                        }
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                />

            </Box>

            {value !== null && (
                <Box>{labels[hover !== -1 ? hover : value]}</Box>
            )}

        </div>
    );
}