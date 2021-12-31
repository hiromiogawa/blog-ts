import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { CategorysProvider } from './components/providers/CategoriesProvider';
import { App } from './components/App';
import { reset } from './style/reset'
import { ScrollToTop } from './components/module/ScrollToTop';


// reset.css
const ResetStyle = createGlobalStyle`
    ${reset}
`

ReactDOM.render((
    <BrowserRouter>
      <CategorysProvider>
        <ScrollToTop />
        <App />
      </CategorysProvider>

    </BrowserRouter>
), document.getElementById('root'));