import React from "react";
import { Card, CardMedia } from "@mui/material";

const Art = ({ image }) => {
    return (
        <Card>
            <CardMedia
                component='img'
                image={image}
            />
        </Card>
    );
};

export default Art;
