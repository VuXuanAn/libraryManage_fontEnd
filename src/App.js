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
function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const nxb = useSelector(state => state.nxb)
  console.log(nxb);
  console.log(auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
    console.log();

  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/nha-xuat-ban" component={NXB} />
        <PrivateRoute exact path="/dau-sach" component={Book} />
        <PrivateRoute exact path="/quan-li-doc-gia" component={UserManage} />
        <PrivateRoute exact path="/quan-li-muon" component={manageBorrowed} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
