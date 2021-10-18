import React, { useEffect, useState, useRef } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useHistory,
  Redirect,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// redux
import { setCurrentUser } from './redux/user/user.actions';
import { connect, useSelector } from 'react-redux';

// styling
import { GlobalStyles, Title } from './styles.js';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// components
import Timeline from './components/pages/TimelineView/Timeline';
import Header from './components/header/Header';
import Signup from './components/pages/Signup/Signup';
import Login from './components/pages/Login/Login';
import DatabaseCard from './components/pages/DatabaseView/DatabaseCard';
import DatabaseList from './components/pages/DatabaseView/DatabaseList';
import temp from './components/pages/temp';

// firebase
import { auth } from './firebase/firebaseUtils';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// axios
import axios from 'axios';
import getContacts from './axios/getContacts';
import getEvents from './axios/getEvents';

// user context
import { userContext } from './appContext/userContext';

const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans', 'old'].join(','),
  },
  palette: {
    primary: {
      main: '#cfd8dc',
      secondary: '#344955',
    },
  },
});

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [queryLoading, setQueryLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [events, setEvents] = useState([]);
  const contactEventData = useRef([]);

  axios.defaults.baseURL =
    'https://australia-southeast1-xxthecalvinsxx.cloudfunctions.net/api/';

  let userSessionTimeout = null;

  auth.onAuthStateChanged((user) => {
    if (user === null && userSessionTimeout) {
      clearTimeout(userSessionTimeout);
      userSessionTimeout = null;
    } else if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        const authTime = idTokenResult.claims.auth_time * 1000;
        const sessionDurationInMilliseconds = 60 * 1000 * 60; // 60 min
        const expirationInMilliseconds =
          sessionDurationInMilliseconds - (Date.now() - authTime);
        userSessionTimeout = setTimeout(
          () => auth.signOut(),
          expirationInMilliseconds
        );
      });
    }
  });

  // let data;
  // let events;

  useEffect(() => {
    const getData = async () => {
      if (!setContacts[0] && user) {
        const contacts = await getContacts(user);
        const events = await getEvents(user);
        setContacts(contacts);
        setEvents(events);
        // setQueryLoading(false);
      }
    };
    // setQueryLoading(true);
    getData();
    setQueryLoading(false);

    // to add error handling
  }, [user]);

  let history = useHistory();
  console.log('loading = ', !loading && !queryLoading);

  if (loading || queryLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress size={100} />
      </Box>
    );
  } else
    return (
      <div className='App'>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />

          <userContext.Provider value={user}>
            <Switch>
              <PrivateRoute
                exact
                path='/'
                component={temp}
                props={{
                  contacts: contacts,
                  events: events,
                  queryLoading: { queryLoading },
                  contactEventData: { contactEventData },
                }}
              />

              <Route
                exact
                path='/signup'
                render={() => (user ? <Redirect to='/' /> : <Signup />)}
              />
              <Route
                exact
                path='/signin'
                render={() => (user ? <Redirect to='/' /> : <Login />)}
              />
              <PrivateRoute
                exact
                path='/databaselist'
                component={DatabaseList}
              />
              <PrivateRoute
                exact
                path='/databasecard'
                component={DatabaseCard}
              />
            </Switch>
          </userContext.Provider>
        </ThemeProvider>
      </div>
    );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);