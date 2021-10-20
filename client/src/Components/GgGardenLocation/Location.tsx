import React, { useEffect } from 'react'
declare let kakao: any;
//카카오맵으로 텃밭위치정보 제공
type propsType={
  address:string,
  logt?:string | null,
  lat?:string | null
}
export const Location:React.FC<propsType> = ({ address, logt, lat }) => {
  const createmap = (_logt: string, _lat: string) => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(parseFloat(_lat), parseFloat(_logt)),
      level: 3
    };

    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(parseFloat(_lat), parseFloat(_logt));
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
  }

  useEffect(() => {
    if(logt && lat){
      kakao.maps.load(() => {
        createmap(logt, lat)
      })
    }
  }, [address, logt, lat])

  return (
    <div className="mapForm">
      {logt === null ?
        <div>
          <div id="map" style={{ width: "100%", height: "200px", display: "none" }}></div>
          <label>잘못된 주소로 지도를 만들 수 없습니다.</label>
        </div>
        : <div>
          <div id="map" style={{ width: "100%", height: "200px", display: "block" }}></div>
        </div>
      }

    </div>
  )
}

