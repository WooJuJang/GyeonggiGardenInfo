import React from 'react';
//지역별 텃밭 나열
type currentPostsType={
  ALL_AR_DESC: string
  APLCATN_METH_CONT: string
  HMPG_ADDR?: string | null
  KITGDN_IDNTFY_NO: string
  KITGDN_NM: string
  LOTOUT_AR_DESC: string
  LOTOUT_PC_CONT: string
  OPERT_MAINBD_NM: string
  RECRUT_PERD?: string | null
  REFINE_LOTNO_ADDR: string
  REFINE_ROADNM_ADDR?: string | null
  REFINE_WGS84_LAT?: string | null
  REFINE_WGS84_LOGT?: string | null
  REFINE_ZIP_CD: string
  REGIST_DE: string
  SIGUN_CD: string
  SIGUN_NM: string
  SUBFACLT_CONT?: string | null
  UPD_DE: string
  __typename?:string
}
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