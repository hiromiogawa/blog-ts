import { FC, useContext, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { LoadFlugContext } from './providers/LoadFlugProvider';
import { Loading } from './template/Loading';
import { Header } from './template/Header';
import { Home } from './pages/Home';
import { PostList } from './pages/PostList';
import { PostSerch } from './pages/PostSerch';
import { PostDetail } from './pages/PostDetail';
import { NotFound } from './pages/NotFound';
import { Footer } from './template/Footer';

export const App: FC = memo(() => {
    const { loadFlug } = useContext(LoadFlugContext);

    return (
        <>
            {loadFlug && <Loading /> }
            <Sapp flug = { loadFlug }>
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
    flug: boolean
}


const Sapp = styled.div<loadFlug>`
    display: ${(props) => props.flug ? 'none': 'block'};;
`