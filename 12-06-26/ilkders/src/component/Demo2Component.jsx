import React from "react";

const Selamla=()=>{
    return(
        <div className="p-3 border">
            <h4 className="font-bold">merhaba dunya</h4>
        </div>
    ) 

}

const Demo2Component=()=>{
    return(
        <div className="p-4">
            <h3 className="tetx-xl font-bold">demo 2 bilesen</h3>
            <div className="mt-4">
                <Selamla/>
                <Selamla/>
                
            </div>
        </div>
    )
}
export default Demo2Component;
   