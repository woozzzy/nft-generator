export const getStyles = (theme) => ({
    listItem: {
        p: 1,
        m: 1,
        bgcolor: 'white',
        fontSize: '0.875rem',
        fontWeight: '700',
        width: '100%',
    },
    box: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
    },
    trait: {
        display: 'inline-flex',
        height: '2rem',
        verticalAlign: 'middle',
        border: '1px solid',
    },
    text: {
        display: 'flex',
        alignItems: 'center',
    },
    img: {
        border: '0.1rem solid',
        borderRadius: '20%',
        background: 'darkgrey',
    },
    textfield: {
        width: '20%',
        "& label": {
            width: "100%",
            textAlign: "center",
            transformOrigin: "center",
            "&.Mui-focused": {
                transformOrigin: "center"
            }
        }
    }
});