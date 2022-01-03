import { FC, memo } from 'react';
import { Color } from '../../style/styleSetting';
import styled, { keyframes } from 'styled-components';

export const Loading: FC = memo(() => {


    return (
        <Sloading><span></span></Sloading>
    );
});

const load2 = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Sloading = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    color: ${Color.white01};
    background-color: ${Color.black01};

    span {
        color: ${Color.green01};
        font-size: 11px;
        text-indent: -99999em;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10em;
        height: 10em;
        box-shadow: inset 0 0 0 1em;
        transform: translateZ(0) translateX(-50%) translateY(-50%);
        opacity: .5;
    }
    
    span,
    span::before,
    span::after {
        border-radius: 50%;
    }

    span::before,
    span::after {
        position: absolute;
        content: '';
    }

    span::before {
        width: 5.2em;
        height: 10.2em;
        background: ${Color.black01};
        border-radius: 10.2em 0 0 10.2em;
        top: -0.1em;
        left: -0.1em;
        transform-origin: 5.1em 5.1em;
        animation: ${load2} 2s infinite ease 1.5s;
    }

    span::after {
        width: 5.2em;
        height: 10.2em;
        background: ${Color.black01};
        border-radius: 0 10.2em 10.2em 0;
        top: -0.1em;
        left: 4.9em;
        transform-origin: 0.1em 5.1em;
        animation: ${load2} 2s infinite ease;
    }
`