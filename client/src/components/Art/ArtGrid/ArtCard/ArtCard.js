import React from "react";
import { Card, CardMedia } from "@mui/material";

const ArtCard = ({ image }) => {
    return (
        <Card>
            <CardMedia
                component='img'
                image={image}
            />
        </Card>
    );
};

export default ArtCard;
