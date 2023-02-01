/** @format */

import React, { useEffect, useRef } from 'react';

const Layout = (props) => {
  //useRef(초기값) 변수 즉 state가 아님 화면 랜더링 안됨 변수를 관리/ 값을 보관 중첩해서 사용 랜더링엔 지장 없고 html 태그 저장 윈도우 리사이즈 스크롤 체크 등
  //그냥 html 태그 저장 하는 거라고 생각하자 편하게
  // useSate( 초기값) state는 무엇인가 랜더링용 변수 상태가 변함
  //아래 구문은 real Dom을 참조함 하지만 오류가 남, 아직 리얼 돔(html tag) 이 안만들어져 참조가 안됨
  // useRef(document.querySelector("section")); //유즈이팩트 실행하고 나서 실행됨 노의미
  // 1번 . 통상적으로 변수 만들어 쓴다고 함
  const frame = useRef(null);

  useEffect(() => {
    //frame useRef를 활용해서 section 태그 참조 해서 css 작업
    // frame.current  돔 요소를 가르킴
    frame.current.classList.remove("on") //지우고
    frame.current.classList.add("on") // 애니메이션 줄거임
    return () => {
      //아래 구문은 에러가 발생
      //unmount가 되면 참조 요소가 null 이된다.
      // frame.current.classList.remove("")
    };
  }, []);
  return (
    // 2번 상위에 만들어둔 useRef 변수 Frame을 ref 속성으로 저장
    <section className={`content ${props.title}`} ref={frame}>
      <figure></figure>
      <div className="inner">
        <h1>{props.title}</h1>
        {props.children}
      </div>
    </section>
  );
};

export default Layout;
