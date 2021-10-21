import './App.css';
import 'antd/dist/antd.css';
import SignIn from './containers/signin'
import NXB from './containers/manageBook/nhaXuatBan';
import Book from './containers/manageBook/Book'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isUserLoggedIn } from './actions/user.action';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/HOC/PrivateRoute';
import { getInitialData } from './actions/initialData.action';
import UserManage from './containers/manageUser'
import manageBorrowed from './containers/manageBorrowRecive/manageBorrow'
import HomePage from './containers/homePage'
import Category from './containers/manageBook/category'
import Blog from './containers/blog'
import Event from './containers/event'
import Profile from './containers/ProfileMedical'
import Patient from './containers/Patient'
function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)


  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);


  return (
    <div className="App">
      <Switch>

        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute path="/nha-xuat-ban" component={NXB} />
        <PrivateRoute path="/dau-sach" component={Book} />
        <PrivateRoute path="/quan-li-doc-gia" component={UserManage} />
        <PrivateRoute path="/quan-li-blog" component={Blog} />
        <PrivateRoute path="/quan-li-muon" component={manageBorrowed} />
        <PrivateRoute path="/the-loai" component={Category} />
        <PrivateRoute path="/su-kien" component={Event} />
        <PrivateRoute path="/medical/patient" component={Patient} />

        <Route path="/signin" component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
