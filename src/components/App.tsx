import { FC, memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './template/Header';
import { Home } from './pages/Home';
import { PostList } from './pages/PostList';
import { PostDetail } from './pages/PostDetail';

export const App: FC = memo(() => {

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/post/:category/:page' element={<PostList/>} />
                <Route path='/post/detail/:id' element={<PostDetail/>} />
                {/*<Navigate to='/404' />*/}
            </Routes>
        </>
    );
});