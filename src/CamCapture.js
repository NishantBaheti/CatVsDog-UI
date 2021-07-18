import React, { useRef, useState, useCallback } from 'react'
import Webcam from "react-webcam"
import { postData } from "./utility"
import "./Common.css"

export const CamCapture = (props) => {
    const webCamRef = useRef(null)
    const [facingMode, setFacingMode] = useState('user')
    const [image, setImage] = useState(null)
    const [prediction, setPrediction] = useState(null)

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: facingMode
    }

    const handleFacingCam = () => {
        if (facingMode === 'user') {
            setFacingMode('environment')
        } else {
            setFacingMode('user')
        }
    }

    const capture = useCallback(
        () => {
            setImage(webCamRef.current.getScreenshot())
            setPrediction("No Prediction.")
        },
        [webCamRef],
    )

    const getPredicton = () => {
        if (image !== null) {
            postData(props.mlApiUrl + 'classify/withImageString', { imageString: image })
                .then(response => {
                    setPrediction(response)
                }).catch((error) => {
                    setPrediction("Network Error.")
                });
        }
        else {
            setPrediction("No Image.")
        }
    }

    const showPrediction = () => {

        if (prediction === null) {
            return "No prediction"
        }
        else {
            let mlOutput = prediction.mlOutput
            if (mlOutput) {
                if (parseFloat(mlOutput.Cat) > parseFloat(mlOutput.Dog)) {
                    return "Cat"
                }
                else {
                    return "Dog"
                }
            }
            else {
                return prediction
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-sm-6">
                    <div className='card'>
                        <div>
                            <Webcam className="card-img-top"
                                audio={false}
                                // height={640}
                                ref={webCamRef}
                                screenshotFormat="image/jpeg"
                                // width={640}
                                mirrored={false}
                                videoConstraints={videoConstraints}
                            />
                            <div className="card-body">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className='btn btn-info' onClick={handleFacingCam} >Change Camera</button>
                                    <button type="button" className='btn btn-primary' onClick={capture}>Capture</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className='card'>
                        <img className="card-img-top" src={image} alt=""></img>
                        <div className='card-body'>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className='btn btn-danger' onClick={() => { setImage(null) }}>Remove</button>
                                <button type="button" className='btn btn-primary' onClick={getPredicton}>Classify</button>
                            </div>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <span className='btn btn-secondary' disabled>Result</span>
                                <span className='btn btn-success' disabled>{showPrediction()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


