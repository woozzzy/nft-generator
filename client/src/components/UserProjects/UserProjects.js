import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardContent, Typography, Grid, ButtonBase } from '@mui/material'
import { Link } from "react-router-dom"


import { getProjects, getProject } from '../../actions/project'
import { ProjectCard, NavBtn } from '../styles'
import { networks } from '../../constants/networks'
import { nextPage, setCanContinue } from '../../slices/pageSlice'
import { clearProject } from '../../slices/projectSlice'


const UserProjects = () => {
    const { user, projects } = useSelector((state) => state.user)
    const { curr, next } = useSelector((state) => state.page)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCanContinue(false))
        dispatch(getProjects(user.token))
    }, [])

    const handleCardClick = (_id) => {
        dispatch(getProject(_id, user.token))
        dispatch(nextPage())
    }

    const handleCreateClick = () => {
        dispatch(clearProject())
        dispatch(nextPage())
    }

    return (
        <>
            <Grid container justifyContent="center" sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                {projects && projects.length > 0 ? projects.map((project, index) => (
                    <Grid item xs={12} sm={3} md={2} key={index} sx={{ margin: '1em' }}>
                        <ProjectCard>
                            <ButtonBase
                                sx={{ width: '100%' }}
                                onClick={() => handleCardClick(project._id)}
                                component={Link}
                                to={next ? next : curr}
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 12 }} noWrap>
                                        {networks[project.chain] ? networks[project.chain] : "unknown"}
                                    </Typography>
                                    <Typography variant="h6" noWrap textOverflow='ellipsis'>
                                        {project.nftName}
                                    </Typography>
                                </CardContent>
                            </ButtonBase>
                        </ProjectCard>
                    </Grid>
                )) : null}
                <Grid item xs={12} sx={{ margin: '1em' }} display='flex' justifyContent='center' alignItems='center'>
                    <NavBtn variant='contained' onClick={handleCreateClick}>
                        <Typography fontFamily='Helvetica' fontWeight='Bold' color='white'>
                            Create New Project
                        </Typography>
                    </NavBtn>
                </Grid>
            </Grid>
        </>
    )
}

export default UserProjects