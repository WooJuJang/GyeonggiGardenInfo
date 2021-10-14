import React from 'react';
//지역별 텃밭 나열
const Posts = ({ posts, loading, getGardenNM }: any) => {
  return (
    <>
      {loading &&
        <div> loading... </div>
      }
      <ul>
        {posts && posts.map((elem: any, index: any) => (
          <div key={index} className="garden_info">
            <li onClick={() => getGardenNM(elem.KITGDN_NM)} className="garden_nm">{elem.KITGDN_NM}</li>
            <label className="garden_address">{elem.REFINE_LOTNO_ADDR}</label>
          </div>

        ))}
      </ul>
    </>
  );
};
export default Posts;