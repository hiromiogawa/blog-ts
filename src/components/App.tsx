import { FC, useContext, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { LoadFlugContext } from './providers/LoadFlugProvider';
import { MenuFlugContext } from './providers/MenuFlugProvider';
import { Loading } from './template/Loading';
import { Header } from './template/Header';
import { Home } from './pages/Home';
import { PostList } from './pages/PostList';
import { PostSerch } from './pages/PostSerch';
import { PostDetail } from './pages/PostDetail';
import { NotFound } from './pages/NotFound';
import { Footer } from './template/Footer';
import { CustomMedia } from '../style/customMedia';

export const App: FC = memo(() => {
    const { loadFlug } = useContext(LoadFlugContext);
    const { menuFlug } = useContext(MenuFlugContext);

    return (
        <>
            {loadFlug && <Loading /> }
            <Sapp flug = { loadFlug } menuFlug= { menuFlug }>
                <Header />
                <main>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/post/:category/:page' element={<PostList/>} />
                        <Route path='/post/serch/:text/:page' element={<PostSerch/>} />
                        <Route path='/post/detail/:id' element={<PostDetail/>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </Sapp>
        </>
    );
});

type loadFlug = {
    flug: boolean,
    menuFlug: boolean
}


const Sapp = styled.div<loadFlug>`
    display: ${(props) => props.flug ? 'none': 'block'};
    ${( props ) => CustomMedia.lessThan('tb')`
        overflow: ${props.menuFlug ? 'hidden': 'visible'};
        max-height: ${ props.menuFlug ? '100vh': 'auto'};
    `};
`