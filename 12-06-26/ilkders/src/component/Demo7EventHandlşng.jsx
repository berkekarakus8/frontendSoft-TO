import React from "react";

const Demo7EventHeadling=()=>{
    const butonaTiklandi=(mesaj)=>{
        alert(mesaj);
    }
    const formGonder=(event)=>{
        event.preventDefault();
        alert('Form Gonderildi, Sayfa yenilemmedi')
    }
    return(
        <div className="p-4">
            <h3 className="text-xl font-bold"> demo 7 : olay yoneticisi</h3>
            <div className="mt-4">
                <h4 className="font-bold">
                    Buton Tıklama Olayı
                </h4>
                <div className="flex flex-col">
                    <button onClick={()=>butonaTiklandi('Basit tıklama')} className="p-2 bg-blue-500">
                        Tıkla. mesaj ver
                    </button>
                    <button onClick={()=>butonaTiklandi('parametreli tıklama')} className="p-2 bg-green-950">parametreli tıklama</button>
                </div>
            </div>
            <div className="mt-4">
                <h4 className="font-bold">form olayı(submit)</h4>
                <form onSubmit={formGonder} className="p-2 border">
                    <input type="text" placeholder="metin giriniz:" className="p-2 border"/>
                    <button type="submit" className="p-2 bg-purple-800">
                        Formu Gonder
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Demo7EventHeadling;