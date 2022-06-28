import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stack, Typography } from '@mui/material'

import { FormField, NavBtn } from '../styles'
import { nextPage, setCanContinue } from '../../slices/pageSlice'
import { updateField } from '../../slices/projectSlice'
import { createProject, updateProject } from '../../actions/project'

const ProjectConfig = () => {
    const project = useSelector((state) => state.project)
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCanContinue(false))
    }, [])

    const handleChange = (e) => {
        dispatch(updateField({ field: e.target.name, data: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(nextPage())
        project._id
            ? dispatch(updateProject(project._id, project, user.token))
            : dispatch(createProject(project, user.token))
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <Stack>
                <FormField color="primary" focused name="nftName" variant="outlined" size="small" label="Name" value={project.nftName} onChange={handleChange} />
                <FormField color="primary" focused name="nftDescription" variant="outlined" size="small" label="Description" value={project.nftDescription} onChange={handleChange} />
                <FormField color="primary" focused name="height" variant="outlined" size="small" label="Height" value={project.height} onChange={handleChange} />
                <FormField color="primary" focused name="width" variant="outlined" size="small" label="Width" value={project.width} onChange={handleChange} />
                <FormField color="primary" focused name="startingEdition" variant="outlined" size="small" label="Starting Edition" value={project.startingEdition} onChange={handleChange} />
                <FormField color="primary" focused name="editionCount" variant="outlined" size="small" label="Edition Count" value={project.editionCount} onChange={handleChange} />
                <NavBtn type="submit" variant="contained">
                    <Typography fontFamily='Helvetica' fontWeight='Bold' color='white'>
                        Save and continue
                    </Typography>
                </NavBtn>
            </Stack>
        </form>
    )
}

export default ProjectConfig