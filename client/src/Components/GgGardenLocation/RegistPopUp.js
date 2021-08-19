import { useMutation, useQuery } from '@apollo/client';
import React,{useState,useEffect} from 'react';
import { FINDUSER, INSERTUSERGARDEN } from '../../Database/Graphql';

const RegistPopUp=(props)=>{
    const{open,close,data}=props
    const [insertUserGarden]=useMutation(INSERTUSERGARDEN,{variables:{garden_name:''}})
    const regist=()=>{
        insertUserGarden({variables:{garden_name:data.KITGDN_NM}})
    }
    return(
    <div className={open?"RegistPopUp":"PopUP"}>
    <section>
        <div>
            {open?
                <div className="innerForm">
                   <header>
                    <button onClick={close}>&times;</button>
                    </header>
                    <div className="main">
                    <label>{data.KITGDN_NM}</label><br/>
                    <label>{data.REFINE_LOTNO_ADDR}</label><br/>
                    <label>{data.OPERT_MAINBD_NM}</label><br/>
                    <label>부대시설: {data.SUBFACLT_CONT}</label><br/>
                    <label>분양가격: {data.LOTOUT_PC_CONT}원</label><br/>
                    </div>
                    <footer><button onClick={regist}>신청하기</button></footer>
                    
                </div>
                
            :''}
        </div>
    </section>
    </div>
    );
}
export default RegistPopUp