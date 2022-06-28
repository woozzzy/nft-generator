import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Typography, Button } from "@mui/material"


import { generateArt } from "../../actions/art"
import ArtGrid from './ArtGrid/ArtGrid'

const Art = () => {
    const project = useSelector((state) => state.project)
    const token = useSelector((state) => state.user.user.token)
    const dispatch = useDispatch()
    const [generated, setGenerated] = useState(project.images.length > 0 ? true : false)


    const handleClick = () => {
        dispatch(generateArt(project, token))
        setGenerated(true)
    }

    return (
        <>
            {generated
                ? <ArtGrid />
                : <Button sx={{
                    boxShadow: 5,
                    aspectRatio: '1/1',
                    margin: '1rem',
                    borderRadius: '50%',
                }} variant="contained" color='error' component="label" onClick={handleClick} >
                    <Typography fontSize='2rem'>GENERATE</Typography>
                </Button>
            }
        </>
    )
}

export default Art