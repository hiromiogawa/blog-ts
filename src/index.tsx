import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LoadFlugProvider } from './components/providers/LoadFlugProvider';
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
      <LoadFlugProvider>
        <CategorysProvider>
          <ScrollToTop />
          <App />
        </CategorysProvider>
      </LoadFlugProvider>
    </BrowserRouter>
), document.getElementById('root'));