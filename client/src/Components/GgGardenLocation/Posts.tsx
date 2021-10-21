import React from 'react';
import type {currentPostsType} from './GgGardenLocationType'
//지역별 텃밭 나열
type propsType={
  posts:currentPostsType[],
  loading:boolean,
  getGardenNM:(text:string)=>void
}
const Posts:React.FC<propsType> = ({ posts, loading, getGardenNM }) => {

  return (
    <>
      {loading &&
        <div> loading... </div>
      }
      
      <ul>
        {posts && posts.map((elem: currentPostsType, index: number) => (
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