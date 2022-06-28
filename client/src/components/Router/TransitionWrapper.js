import React from 'react'
import { Box } from '@mui/material'
import { motion } from "framer-motion/dist/framer-motion"

const TransitionWrapper = ({ element }) => {

    return (
        <Box component={motion.div}
            // initial={{ x: 300 * x1, opacity: 0 }}
            // animate={{ x: 0, opacity: 1 }}
            // exit={{ x: 200 * x2, opacity: 0, transition: { duration: 0.2 } }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, }}

            display='flex'
            alignItems='center'
            justifyContent='center'
            width='100%'
        >
            {element}
        </Box>
    )
}

export default TransitionWrapper