import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stack } from '@mui/material'

import { FormField } from '../styles'
import { setCanContinue } from '../../slices/pageSlice'

const ProjectConfig = () => {
    const project = useSelector((state) => state.project)
    console.log(project)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCanContinue(false))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (project._id) {
            // dispatch(updateConfig(project._id, project));
        } else {
            // dispatch(createConfig(project))
        }
    }

    const handleChange = (e) => {
        const data = { ...project };
        data[e.target.name] = e.target.type === "checkbox"
            ? e.target.checked
            : e.target.value;
        // dispatch(setCurrentConfig(data));
    }

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Stack>
                    <FormField color="primary" focused name="nftName" variant="outlined" size="small" label="Name" value={project.nftName} onChange={handleChange} />
                    <FormField color="primary" focused name="nftDescription" variant="outlined" size="small" label="Description" value={project.nftDescription} onChange={handleChange} />
                    <FormField color="primary" focused name="height" variant="outlined" size="small" label="Height" value={project.height} onChange={handleChange} />
                    <FormField color="primary" focused name="width" variant="outlined" size="small" label="Width" value={project.width} onChange={handleChange} />
                    <FormField color="primary" focused name="startingEdition" variant="outlined" size="small" label="Starting Edition" value={project.startingEdition} onChange={handleChange} />
                    <FormField color="primary" focused name="editionCount" variant="outlined" size="small" label="Edition Count" value={project.editionCount} onChange={handleChange} />
                </Stack>
            </form>
        </>
    )
}

export default ProjectConfig