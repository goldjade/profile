/** @format */

import React, { useEffect, useRef, useState } from 'react';
import LayOut from '../common/LayOut';
import { CommunityCard } from './CommunityCard';
// 01 useForm import
// https://react-hook-form.com/                   npm install react-hook-form
// https://github.com/jquense/yup/tree/pre-v1     npm install -S yup
// npm install @hookform/resolvers    hook-form이랑 yup을 연결해주는 라이브러리
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//02 form 요소의 항목별 에러체크 정의
const schema = yup.object({
  title: yup.string().trim().required('제목을 입력해주세요'),
  content: yup.string().trim().required('내용을 입력해주세요'),
});

const Community = () => {
  //03. useForm 생성
  //register 각각의 form의 name의 내용을 생성한다.
  // handleSubmit : form에서  onSubmit 할때 실행됨
  //reset : form에서 reset 할때 실행
  // formState:{errors}  yup 에러 출력 활용
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), //yup과 연결시켜줌
    mode: 'onChange', // mode가 onchange면 실행하라
  });

  // 데모용 데이터 생
  const initPost = [
    { title: 'Hello 1', content: 'Welocome To React!' },
    { title: 'Hello 2', content: 'Welocome To React!' },
    { title: 'Hello 3', content: 'Welocome To React!' },
    { title: 'Hello 4', content: 'Welocome To React!' },
    { title: 'Hello 5', content: 'Welocome To React!' },
  ];
  const [posts, setPosts] = useState(initPost);

  const inputEdit = useRef(null);
  const textareaEdit = useRef(null);
  const [Allowed, setAllowed] = useState(true);

  const createPost = (data) => {
    //data === {title:title , content:content}
    setPosts([...posts, data]);
    // ...register("title")
    // ...register("content")
    reset();
    setAllowed((prev) => true);

    setPosts((prev) => {
      const arr = [...prev];
      const updateArr = arr.map((item, index) => {
        item.enableUpdate = false;
        return item;
      });
      return updateArr;
    });
  };

  // 삭제기능
  const deletePost = (idx) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }
    setPosts(posts.filter((item, index) => idx !== index));
  };
  // 업데이트 기능
  const enableUpdate = (idx) => {
    if (!Allowed) return;
    setAllowed(false);

    setPosts(
      posts.map((item, index) => {
        if (idx === index) {
          item.enableUpdate = true;
        }
        return item;
      })
    );
  };
  const disapleUpdate = (idx) => {
    setAllowed(true);

    setPosts(
      posts.map((item, index) => {
        if (index === idx) {
          item.enableUpdate = false;
        }
        return item;
      })
    );
  };
  // 게시물 업데이트
  const updatePost = (idx) => {
    // 빈문자열 체크 ""
    if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
      inputEdit.current.value = '';
      textareaEdit.current.value = '';
      return alert('수정할 제목과 내용을 입력해주세요.');
    }
    setPosts(
      posts.map((item, index) => {
        if (idx === index) {
          item.title = inputEdit.current.value;
          item.content = textareaEdit.current.value;
          item.enableUpdate = false;
        }
        return item;
      })
    );

    // 업데이트 가능하도록
    setAllowed(true);
  };
  // 디버깅
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <LayOut title={'Community'}>
      {/* 입력폼 */}
      <div className="inputBox">
        <form onSubmit={handleSubmit(createPost)}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            {...register('title')}
          />
          <span className="err">{errors.title?.message}</span>
          <br />
          <textarea
            cols="30"
            rows="5"
            placeholder="본문을 입력하세요."
            {...register('content')}
          ></textarea>
          <span className="err">{errors.content?.message}</span>
          <div className="btnSet">
            {/* form 안쪽에 버튼은 type 을 정의한다. */}
            <button type="reset">CANCEL</button>
            <button type="submit">WRITE</button>
          </div>
        </form>
      </div>
      {/* 리스트 출력 */}
      <div className="showBox">
        {/* 목록을 출력할 땐 map(), 그리고 key */}
        {
          // posts.map((item, index) =>  (JSX) );
          posts.map((item, index) => {
            // uuid : https://www.npmjs.com/package/uuid
            // 중복되지않는 key 를 만들어주는 라이브러리
            // 그러나 기본은 가능하면 본인이 key를 관리
            return (
              <CommunityCard
                key={index}
                item={item}
                inputEdit={inputEdit}
                textareaEdit={textareaEdit}
                index={index}
                disapleUpdate={disapleUpdate}
                updatePost={updatePost}
                enableUpdate={enableUpdate}
                deletePost={deletePost}
              />
            );
          })
        }
      </div>
    </LayOut>
  );
};
export default Community;
