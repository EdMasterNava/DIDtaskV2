import * as React from 'react';
import Hero from './modules/components/Hero';
import { 
    Box 
} from '@mui/material';

import style from './modules/styles/styles';
import withRoot from './modules/styles/withRoot';


function Home() {
    const css = style();
    return (
        <>
            {/* Video Container */}
            <Box sx={{...css.navHeroContainer, ...css.navHeroBackground}}>
                <Box sx={{...css.circle}}>
                    <video />    
                </Box>
            </Box>
            {/* Blur Effect */}
            <Box sx={{...css.navHeroContainer, ...css.blurry}}>
                <Box sx={{...css.circle}}/>
            </Box>
            <Hero />
        </>
    );
}

export default withRoot(Home);