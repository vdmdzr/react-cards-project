import React from 'react';
import style from "./CheckEmail.module.css";
import {Link, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import emailImg from "../../../assets/images/email.png"


const CheckEmail = () => {

	const {email} = useParams()

	return (
		<>
			<Grid container>
				<div className={style.background}>
					<Box display="flex" justifyContent="center">
						<Paper elevation={6} className={style.paper}>
							<div className={style.title}>CHECK EMAIL</div>
							<img alt={'checkEmail'} className={style.img} src={emailImg}/>
							<div className={style.titleSend}>We`ve send an Email with instructions to</div>
							<div className={style.email}>{email}</div>
							<div className={style.text}>Do you remember your password?</div>
							<div className={style.email}>
								<Link className={style.email} to={'/login-page'}>
									Try to log in
								</Link>
							</div>
						</Paper>
					</Box>
				</div>
			</Grid>
		</>
	);
};

export default CheckEmail;