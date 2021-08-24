import React from 'react';

const Posts = ({ posts, loading,getGardenNM }) => {
  return (
    <>
  { loading &&
    <div> loading... </div>
  }
  <ul>
    { posts && posts.map((elem,index)=>(
        <div key={index} className="garden_info">
            <li onClick={()=>getGardenNM(elem.KITGDN_NM)} className="garden_nm">{elem.KITGDN_NM}</li>
            <label className="garden_address">{elem.REFINE_LOTNO_ADDR}</label>
        </div>

    ))}
  </ul>
  </>
  );
};
export default Posts;