import { useState } from 'react'


import Demo1JSXBasic from './component/Demo1JSXBasic'
import Demo2Component from './component/Demo2Component'
import Demo3PropsBasic from './component/Demo3PropsBasic'
import Demo4PropsChildren from './component/Demo4PropsChildren'
import Demo5Rendering from './component/Demo5Rendering'
import Demo6ListRendering from './component/Demo6ListRendering'
import Demo7EventHeadling from './component/Demo7EventHandlşng'
import Demo8ReadOnlyProps from './component/Demo8ReadOnlyProps'
import Demo9DefaultProps from './component/Demo9DefaultProps'

function App() {
  const [selectedDemo ,setSelectedDemo ] = useState(1);
  const renderDemo=()=>{
    switch(selectedDemo){
      case 1:
        return<Demo1JSXBasic/>;
      case 2:
        return<Demo2Component/>;
      case 3:
        return<Demo3PropsBasic/>;
      case 4:
        return<Demo4PropsChildren/>;
      case 5:
        return<Demo5Rendering/>;
      case 6:
        return<Demo6ListRendering/>;  
      case 7:
        return<Demo7EventHeadling/>;   
      case 8:
        return<Demo8ReadOnlyProps/>;   
      case 9:
        return<Demo9DefaultProps/>;   
      default:
        return<Demo1JSXBasic/>;    

    }
  }

  const demolar=[
    {id:1,ad:"Demo1:temel jsx"},
    {id:2,ad:"Demo2:bilesenler"},
    {id:3,ad:"Demo3:props"},
    {id:4,ad:"Demo4:props children"},
    {id:5,ad:"Demo5:kosullu render"},
    {id:6,ad:"Demo6:list rendering"},
    {id:7,ad:"Demo7:onay yonetimi"},
    {id:8,ad:"Demo8:salt okunur"},
    {id:9,ad:"Demo9:genel props"},
  ]

  return (
    <>
    <div className='p-4'>
      <div className='border'>
        <div className='p-4 bg-orange-600'>
          <h1 className='text-white text-xl'>React ve Props Paneli</h1>
        </div>
        <div className='grid grid-cols-4'>
          <div className='border-r'>
            <div className='sidebar-list'>
              {demolar.map((demo)=>(
                <button key={demo.id}
                onClick={()=>setSelectedDemo(demo.id)}
                className={selectedDemo===demo.id?"bg-blue-500 text-white":"bg-gray-100"}>
                  {demo.ad}
                </button>  
              ))}
            </div>
          </div>
          <div className='col-span-3'>
            <div className='p-4'>
              {renderDemo()}
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
