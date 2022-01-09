import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LoadFlugProvider } from './components/providers/LoadFlugProvider';
import { createGlobalStyle } from 'styled-components';
import { CategorysProvider } from './components/providers/CategoriesProvider';
import { MenuFlugProvider } from './components/providers/MenuFlugProvider';
import { App } from './components/App';
import { FontStyles } from "./style/fontStyle";
import { reset } from './style/reset'
import { ScrollToTop } from './components/module/ScrollToTop';


// reset.css
const ResetStyle = createGlobalStyle`
    ${reset}
`

ReactDOM.render((
    <BrowserRouter>
      <LoadFlugProvider>
        <MenuFlugProvider>
          <CategorysProvider>
            <ResetStyle />
            <FontStyles />
            <ScrollToTop />
            <App />
          </CategorysProvider>
        </MenuFlugProvider>
      </LoadFlugProvider>
    </BrowserRouter>
), document.getElementById('root'));