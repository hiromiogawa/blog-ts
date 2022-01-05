import { FC, memo, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { siteName } from '../../setting/setting';
import { LoadFlugContext } from '../providers/LoadFlugProvider';
import styled from 'styled-components';
import { Scontents } from '../../style/commonStyle';
import { Color } from '../../style/styleSetting';
import { CustomMedia } from '../../style/customMedia';

export const NotFound: FC = memo(() => {
    const { pathname } = useLocation();
    const { setLoadFlug } = useContext(LoadFlugContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `NotFound | ${siteName}`;
        window.gtag('config', 'G-GCE0NCNRNG', {
			'page_path': pathname
		});
        setLoadFlug(false);
        setTimeout(() => { 
            navigate('/');
        }, 3000);
    }, [])

    return (
        <Scontents>
            <Smes>Error 404</Smes>
        </Scontents>
    );
});

const Smes = styled.p`
    font-size: 64px;
    height: calc(100vh - (144px +  136px));
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'OriginalSurfer_Regular';
    color: ${Color.whitesmoke};
    ${CustomMedia.lessThan("tb")`
        height: calc(100vh - (136px +  136px));
        font-size: 56px;
    `};
    
`