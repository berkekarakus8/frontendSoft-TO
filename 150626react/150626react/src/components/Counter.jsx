import {useState} from "react";

const Counter=()=>{
    const [sayi,setSayi]=useState(0);

    const arttir=()=>{
        setSayi(sayi+1);
    }
    const azalt=()=>{
        setSayi(sayi-1);
    }
    const sifirla=()=>{
        setSayi(0);
    }
    const besArttir=()=>{
        setSayi((oncekiSayi)=> oncekiSayi+5);
    }
return(
    <div className="p-4">
        <h3 className="font-bold">Temel Counter</h3>
        <div className="card p-4">
            <span className="text-sm">Mevcut Deger</span>
            <span className="text-6xl">{sayi}</span>

            <div className="flex flex-wrap gap-2">
                <button className="flex-1 " onClick={azalt}>-1 azalt</button>
                <button className="flex-1" onClick={sifirla}>Sıfırla</button>
                <button className="flex-1" onClick={arttir}>+1 arttır</button>
                <button className="m-3" onClick={besArttir}>+5 arttır (Guvenli Callback::prev</button>
            </div>
            <div className="mt-6">
                <h4 className="font-semibold">Ogrenim Notu</h4>
                <ul className="list-disc">
                    <li>(0) ifadesi baslangıc degerini 0 olarak kodlar</li>
                    <li>State icindeki sayi=sayi+1 seklinde degistirilemez.Usestate bir fonksiyon ister set ile baslayan bu state icindeki degeri guncellemek vb. islemleri yapmak icin kullanılır</li>
                    <li>Ardısık veya asenkron duurmlarda onceki degere bagımlı guncellemeler icin prev yani callback yapısı tercih edilmelidir.</li>
                </ul>
            </div>
        </div>
    </div>
)





}



export default Counter ;