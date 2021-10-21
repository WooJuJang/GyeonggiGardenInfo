import { useMutation } from '@apollo/client';
import React from 'react';
import { INSERTUSERGARDEN } from '../../Database/Graphql';
type gardenDetailInfoType={
    SG_NM?: string,
    OPERT_MAINBD_NM?: string,
    KITGDN_NM?: string,
    SUBFACLT_CONT?: string,
    LOTOUT_PC_CONT?: string,
    REFINE_LOTNO_ADDR?: string,
    REFINE_WGS84_LOGT?: string | null |undefined,
    REFINE_WGS84_LAT?: string | null | undefined
}
type popUpType={
    open:boolean
    close:()=>void,
    data:gardenDetailInfoType,
}
//텃밭 신청팝업
const RegistPopUp:React.FC<popUpType> = ({open,close,data}) => {

    interface inserUserGardenVar{
        garden_name:string,
        garden_latitude:number,
        garden_longitude:number,
        moisture:number,
        nutrition:number,
        weed_quantity:number
    }
    const [insertUserGarden] = useMutation<inserUserGardenVar>(INSERTUSERGARDEN, {
        onCompleted: () => {
            close();
        }
    })
    const regist = ():void => {
        if(data.REFINE_WGS84_LAT && data.REFINE_WGS84_LOGT)
        insertUserGarden({ variables: { garden_name: data.KITGDN_NM, garden_latitude: parseFloat(data.REFINE_WGS84_LAT), garden_longitude: parseFloat(data.REFINE_WGS84_LOGT), moisture: 0, nutrition: 0, weed_quantity: 0 } })
    }
    return (
        <div className={open ? "RegistPopUp" : "PopUP"}>
            <section>
                <div>
                    {open ?
                        <div className="innerForm">
                            <header>
                                <button onClick={()=>close} className="exit-btn">&times;</button>
                            </header>
                            <div className="main">
                                {data ? <>
                                    <label className="kitgdn_nm">{data.KITGDN_NM}</label><br />
                                <label className="main_content">주소: {data.REFINE_LOTNO_ADDR}</label><br />
                                <label className="main_content">관리자: {data.OPERT_MAINBD_NM}</label><br />
                                

                                {data.SUBFACLT_CONT ? <>
                                    <label className="main_content">부대시설: {data.SUBFACLT_CONT}</label><br /></>
                                    : <>
                                        <label className="main_content">부대시설: 데이터가 존재 하지 않습니다.</label><br /></>
                                }
                                {data.LOTOUT_PC_CONT ? <>
                                    <label className="main_content">
                                        분양가격: {data.LOTOUT_PC_CONT}
                                    </label><br /></>
                                    : <>                 <label className="main_content">
                                        분양가격: 데이터가 존재 하지 않습니다.
                                    </label><br /></>
                                }
                                </>:<><label>no _data</label></>}
                            </div>
                            <button onClick={regist} className="registBtn">신청하기</button>

                        </div>

                        : ''}
                </div>
            </section>
        </div>
    );
}
export default RegistPopUp