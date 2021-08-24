  /*global kakao*/ 
import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { FINDLOGTLAT } from '../../Database/Graphql'

export const Location=({address,logt,lat})=>{

  const findLogtLat=useQuery(FINDLOGTLAT,{variables:{address:''}})

  const createmap=(_logt,_lat)=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(parseFloat(_lat),parseFloat(_logt)),
      level: 3
    };

    var map = new kakao.maps.Map(container, options);
    var markerPosition  = new kakao.maps.LatLng(parseFloat(_lat),parseFloat(_logt)); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
  });
  marker.setMap(map);
  }

  useEffect(()=>{
    if(logt===null || lat===null){
      findLogtLat.refetch(FINDLOGTLAT,{variables:{address:address}})
      
    }else{
      createmap(logt,lat)
    }
    }, [address,logt,lat,findLogtLat])

useEffect(()=>{
  if(findLogtLat.loading===false && findLogtLat.data){
    createmap(findLogtLat.data.findLogtLat[0],findLogtLat.data.findLogtLat[1])

  }
},[findLogtLat.data,findLogtLat.loading])
    return (
        <div className="mapForm">
        <div id="map" style={{width:"100%", height:"200px"}}></div>     
        </div>
    )
}

