import React from "react";


const DegistirilmeyenKart=(props)=>{
    const deneVeHataGoster=()=>{
        try{
            props.baslik="Yeni Baslık";

        }catch(hata){
            alert("Hata Yakalandı!Props Degistirilemez"+hata.message);
        }
    }
    return(
        <div className="card">
            <h4 className="font-bold">{props.baslik}</h4>
            <p className="text-gray-500">gelen prop degeri{props.baslik}</p>
            <button onClick={deneVeHataGoster} className="btn-red">prop degistirmeyi dene</button>
        </div>
    )
}

const Demo8ReadOnlyProps=()=>{
    return(
        <div className="p-4">
            <h3 className="text-xl font-bold">demo 8: Salt Okunur(readony) Props</h3>
            <div className="mt-4">
                <DegistirilmeyenKart baslik="Degistirilmeyen kart baslık"/>
            </div>
        </div>
    );
};
export default Demo8ReadOnlyProps;