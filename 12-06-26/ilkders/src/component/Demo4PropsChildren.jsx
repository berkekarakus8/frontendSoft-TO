import React from "react";

const Kart=(props)=>{
    return(
        <div className="card">
            {props.children}

        </div>
    )
}

const Demo4PropsChildren=()=>{
    return(
        <div className="p-4">
            <h3 className="text-xl font-bold">DEMO 4 props.children kullanımı</h3>
            <div className="product-grid">
                <Kart>
                    <h4 className="font-bold">kart:baslık</h4>
                    <p className="text-sm">birinci kartın icerik metni</p>
                </Kart>
                <Kart>
                    <h4 className="font-bold">
                        kart 2 baslık
                    </h4>
                    <button className="btn-blue">kart butonu</button>
                </Kart>
            </div>
        </div>
    )
}
export default Demo4PropsChildren;