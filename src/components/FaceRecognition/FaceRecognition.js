import React from 'react'
import './FaceRecognition.css'
const FaceRecognition = ( {imgUrl,box} ) => {

	return (
		<div className='center'>
			<div className="absolute mt2">
				<img id='inputimage' alt="DetectedImage" src={imgUrl} width='500px' height='auto'/>
			{	
				box.map( (value,i) => 
				{
					return (<div className='bounding-box' style={{left: value.left_col ,top: value.top_row, 
				right: value.right_col, bottom: value.bottom_row}}></div>);
				}

				)

			}
				
			</div>
			
		</div>
		);


}

export default FaceRecognition;