import React, { useState } from 'react'
import { postImageFile } from './utility'
import "./Common.css"

export const ImageUpload = (props) => {

    const [imageFile, setImageFile] = useState(null)
    const [prediction, setPrediction] = useState(null)
    const [image, setImage] = useState(null)

    const selectFile = (e) => {
        setImageFile(prevFile => e.target.files[0])
        setPrediction("No Prediction.")
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const loadImage = (imageObj) => {
        if (imageObj === null) {
            return null
        } else {
            const fd = new FormData();
            fd.append("image", imageObj, imageObj.name);
            return fd
        }
    }

    const getPredicton = () => {
        if (imageFile !== null) {
            postImageFile(props.mlApiUrl + 'classify/withImageFile', loadImage(imageFile))
                .then(response => {
                    setPrediction(response)
                }).catch((error) => {
                    // alert(error)
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
                            <div className="card-body">
                                <input type="file" onChange={selectFile} />
                            </div>
                            <div className="card-img-top">
                                <img src={image} alt="" ></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className='card'>
                        <div className='card-body'>
                            <button type="button" className='btn btn-primary' onClick={getPredicton}>Classify</button>
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
