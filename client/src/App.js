import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Contacts from './components/pages/DatabaseView/DatabaseList'
import View from './components/pages/ContactView/ContactView'
import { createTheme, ThemeProvider } from '@material-ui/core'
import SideNavBar from './components/pages/SideNavBar/SideNavBar'


const theme = createTheme({
    typography: {
      fontFamily: [
        'Open Sans',
        'old',
      ].join(','),
    },
    palette: {
      primary: {
        main: '#CFD8DC'
      }
    }  
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SideNavBar>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/contacts">
              <Contacts />
            </Route>
            <Route path="/view">
              <View />
            </Route>
          </Switch>
        </SideNavBar>
      </Router>
    </ThemeProvider>
  );
}

export default App;