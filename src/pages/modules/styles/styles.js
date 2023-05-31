const style = () => ({
    navHeroContainer: {
        width: '100vw', 
        maxHeight: 700, 
        minHeight: 300, 
        '&::before': {content: '""', pb: '75%'}
    },
    navHeroBackground: {
        position: 'absolute',
        overflow: 'hidden',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: -1,
    },
    blurry: {
        position: 'absolute', 
        backdropFilter: 'blur(25px)',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 0,
    },
    circle: {
        width: '50%', 
        height: 0, 
        borderRadius: '50%', 
        overflow: 'hidden', 
        position: 'relative', 
        pb: '50%'
    },
    plasma: {
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-51%, -50%)', 
        objectFit: 'cover',
        width: '109%',
        height: '109%'
    },
    navbar: {
        height: 60, 
        width: '100%', 
        position: 'fixed', 
        px: '5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        zIndex: 1,
        bgcolor: 'transparent',
        backdropFilter: 'blur(5px)'
    },
    navbarLeftSection: {
        height: '100%', 
        width: '100%', 
        display: 'flex'
    },
    navbarTitle: {
        alignItems: 'center', 
        justifyContent: 'center', 
        display: 'flex', 
        mr: 2
    },
    link: {
        textDecoration: 'none'
    },
    navbarPaddingAndColor: {
        letterSpacing: 2, 
        color: 'whitesmoke'
    },
    flexCenter: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    navbarRightSection: {
        height: '100%', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'flex-end'
    },
    heroContainer: {
        display: 'flex',
        position: 'relative'
    },
    connectWalletButton: {
        border: '1px solid whitesmoke', 
        px: 2, 
        '&:hover': { 
            backgroundColor: 'rgba(217, 217, 217, 0.12)' 
        }
    },
    walletButtonText: {
        letterSpacing: 1, 
        color: 'whitesmoke', 
        whiteSpace: 'nowrap'
    },
    walletConnectedButton: { 
        border: '1px solid whitesmoke',
        mr: 2, 
        px: 2, 
        '&:hover': {
            bgcolor: 'transparent'
        },
        cursor: 'default'
    },
    avatarText: {
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        maxWidth: '6ch', 
        letterSpacing: .5
    }
});

export default style;