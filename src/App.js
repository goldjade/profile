/** @format */
import { Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Visual from './components/main/Visual';
import Content from './components/main/Content';
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Join from './components/sub/Join';
import Youtube from './components/sub/Youtube';

function App() {
  return (
    <>
      <Header />
      {/*Route: 화면별 Link에 의해 출력될 단위 
      path : 연결할 주소
      exact : 정확하게 path가 같을 때만 보여준다
      */}
      <Route exact path="/">
        <Visual />
        <Content />
      </Route>
      {/* 
      Router 1번 방식
      <Route path="/department">
        <Department />
      </Route> */}
      {/*
      Router 2번 방식
      인라인 방식의 Route 적용 */}
      <Route path="/department" component={Department} />
      <Route path="/community" component={Community} />
      <Route path="/Department" component={Gallery} />
      <Route path="/Youtube" component={Youtube} />
      <Route path="/Location" component={Location} />
      <Route path="/Join" component={Join} />
      <Footer />
    </>
  );
}

export default App;
