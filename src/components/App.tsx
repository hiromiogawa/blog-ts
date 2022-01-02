import { FC, useContext, memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoadFlugContext } from './providers/LoadFlugProvider';
import { Header } from './template/Header';
import { Home } from './pages/Home';
import { PostList } from './pages/PostList';
import { PostSerch } from './pages/PostSerch';
import { PostDetail } from './pages/PostDetail';

export const App: FC = memo(() => {
    const { loadFlug } = useContext(LoadFlugContext);

    return (
        <>
        {loadFlug && <div>Loading</div> }
            <Header />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/post/:category/:page' element={<PostList/>} />
                <Route path='/post/serch/:text/:page' element={<PostSerch/>} />
                <Route path='/post/detail/:id' element={<PostDetail/>} />
                {/*<Navigate to='/404' />*/}
            </Routes>
        </>
    );
});