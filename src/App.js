import { Header } from "./Header"
import { Footer } from "./Footer"
import { CamCapture } from "./CamCapture"
import { ImageUpload } from "./ImageUpload"
import React, { useState } from "react"
import { config } from "./config"

function App() {

  const mlApiUrl = config.mlApiUrl || "https://catordogpython.herokuapp.com/"
  const [resourceType, setResourceType] = useState(null)

  return (
    <div>
      <Header />
      <div className="btn-group" role="group" aria-label="Basic example">
        <button className="btn btn-primary" onClick={() => setResourceType(<ImageUpload mlApiUrl={mlApiUrl} />)}>Upload Image</button>
        <button className="btn btn-success" onClick={() => setResourceType(<CamCapture mlApiUrl={mlApiUrl} />)}>Capture Image</button>
      </div>
      <div>
        {resourceType}
      </div>
      <Footer />
    </div>
  );
}

export default App;
