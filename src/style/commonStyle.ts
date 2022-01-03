import styled, { css, keyframes } from 'styled-components';
import { Color, Vw, Device } from './styleSetting';
import { CustomMedia } from './customMedia';


// コンテンツエリア
export const Scontents = styled.div`
    max-width: ${Device.ct}px;
    width: 100%;
    margin: 0 auto;
    padding: 0 40px;
    ${CustomMedia.lessThan("tb")`
        padding: 0 16px;
    `};
`