import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './Components/Footer';
import Header from './Components/Header';
import PostList from './Pages/PostList';
import PostDetails from './Pages/PostDetails';
import { Container } from 'semantic-ui-react';


function App() {
  return (
    <Router>
      <div style={{backgroundColor: '#edeef0', height: '100%'}}>
        <Header/>
        <Route exact path="/" component={PostList}/>
        <Route path="/post/:id" component={PostDetails}/>
      </div>
    </Router>
  );
}

export default App;
