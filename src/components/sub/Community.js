/** @format */

import React, { useEffect } from 'react';
import LayOut from '../common/LayOut';

const Community = () => {
  //javascript 코드 자리
  //컴포넌트가 마운트, 업데이트(state 변경), 언마운트 시 하고싶은 일을 작성하는 hook  useEffect,
  //기본 형태
  // useEffect(()=>{
  //   //하고싶은일
  //   //클린업 함수 : 언마운트(컴포넌트 제거)시 실행
  //   return ()=>{

  //   }
  // },[의존성배열 : defendency Array])
  useEffect(() => {
    console.log('mount :컴포넌트생성');
    //axios, html 요소선택하는 작업
    return () => {
      console.log('unmount:컴포넌트제거');
    };
  }, []);
  return (
    //jsx 코드 자리 : 주의사항 return(괄호)있어야함 {중괄호} 이거 아님
    <LayOut title={'Community'}>Community</LayOut>
  );
};

export default Community;
