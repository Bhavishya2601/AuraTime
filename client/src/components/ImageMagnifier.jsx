import React, {useState} from 'react'

const ImageMagnifier = ({src, width, height, magnifierHeight=200, magnifierWidth = 200, zoomLevel=1.5}) => {

    const [[x,y], setXY] = useState([0, 0])
    const [[imgWidth, imgHeight], setSize] = useState([0, 0])
    const [showMagnifier, setShowMagnifier] = useState(false)

  return (
    <div className='relative' style={{height: height, width: width}}>
      <img src={src} className='object-cover' style={{height: height, width: width}} 
    onMouseEnter={(e)=>{
        const elem = e.currentTarget
        const {width, height} = elem.getBoundingClientRect()
        setSize([width, height])
        setShowMagnifier(true)
    }}
    onMouseMove={(e)=>{
        const elem = e.currentTarget
        const {top, left} = elem.getBoundingClientRect()
        const x = e.pageX - left - window.pageXOffset;
        const y = e.pageY - top - window.pageYOffset;
        setXY([x, y])
      }}
      onMouseLeave={()=>{
        setShowMagnifier(false)
      }}
      alt='img'
      />
      <div className={`absolute pointer-events-none bg-white border border-lightgray transition-opacity duration-300 ease-in-out ${showMagnifier ? "opacity-100" : "opacity-0"}`} 
      style={{
        height: `${magnifierHeight}px`,
        width: `${magnifierWidth}px`,
        top: `${y - magnifierHeight/2}px`,
        left: `${x - magnifierWidth/2}px`,
        backgroundImage :`url('${src}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${imgWidth*zoomLevel}px ${imgHeight*zoomLevel}px`,
        backgroundPositionX: `${-x*zoomLevel + magnifierWidth/2}px`,
        backgroundPositionY: `${-y*zoomLevel + magnifierHeight/2}px`
      }}>

      </div>

    </div>
  )
}

export default ImageMagnifier
