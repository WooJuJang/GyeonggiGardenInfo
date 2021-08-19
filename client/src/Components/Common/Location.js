  /*global kakao*/ 
import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { FINDLOGTLAT } from '../../Database/Graphql'

export const Location=({address,logt,lat})=>{

  const findLogtLat=useQuery(FINDLOGTLAT,{variables:{address:address}})
  const [logtlat,setLogtLat]=useState({
    setlogt:logt,
    setlat:lat
  })

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
      console.log(address)
      findLogtLat.refetch(FINDLOGTLAT,{variables:{address:address}})
      setLogtLat({setlogt:findLogtLat[0],setlat:findLogtLat[1]})
      
    }else{
      createmap(logt,lat)
    }
    }, [logt,lat])

useEffect(()=>{
  if(findLogtLat.loading===false && findLogtLat.data){
    console.log('in!')
    console.log(findLogtLat.data.findLogtLat[0])
    createmap(findLogtLat.data.findLogtLat[0],findLogtLat.data.findLogtLat[1])
  }
},[findLogtLat.data])
    return (
        <div>
        <div id="map" style={{width:"80%", height:"200px"}}></div>     
        </div>
    )
}

