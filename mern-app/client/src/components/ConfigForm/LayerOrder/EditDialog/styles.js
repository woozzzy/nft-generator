export const getStyles = (theme) => ({
    listItem: {
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        width: '100%',
    },
    box: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        // border: '1px solid',
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
        border: '1px solid',
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