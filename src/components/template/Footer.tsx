import { FC, memo } from 'react';
import styled from 'styled-components';
import { Scontents } from '../../style/commonStyle';
import { siteName } from '../../setting/setting';
import { Color } from '../../style/styleSetting';


export const Footer: FC = memo(() => {


    return (
        <Sfooter>
            <Scontents>
                <p><small>© 2022 {siteName}.</small></p>
            </Scontents>
        </Sfooter>
    );
});

const Sfooter = styled.footer`
    padding: 24px 0;
    margin-top: 56px;

    p {
        text-align: center;

        small {
            color: ${Color.whitesmoke};
        }
    }
`