import React, {ChangeEvent} from 'react';
import {UploadPhotoType} from "../../../pages/profile/ProfilePage";

type InputPropsType = {
	children: React.ReactNode
	updatePhotoHandler: (data: UploadPhotoType) => void
	keyFotoField: string
}

export const InputTypeFile = React.memo((props: InputPropsType) => {

	const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			if (file.size < 4000000) {
				convertFileToBase64(file, (file64: string) => {
					props.updatePhotoHandler({[props.keyFotoField]: file64})
				})
			} else {
				alert('Файл слишком большого размера')
			}
		}
	}

	const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const file64 = reader.result as string
			callBack(file64)
		}
		reader.readAsDataURL(file)
	}

	return (
		<label>
			<input type="file"
			       onChange={uploadHandler}
			       style={{display: 'none'}}
			/>
			{props.children}
		</label>
	)
})