import React from 'react';
import './ImageLinkForm.css';
function ImageLinkForm({handleInputChange,handleSubmit}) {
    return (
        <div>
            <p className="text-center info">
            {'This brain will detect face from your picture. Give it a try.'}
            </p>
            <div className='form fs-5 p-4'>
                <input type="text" className=" center rounded" name="imgUrlInput" onChange={(e)=>handleInputChange(e)}/>
                <button stype="submit" className='btn btn-primary btn-submit m-2 fs-5 px-3'
                onClick={()=>handleSubmit()}
                >Submit </button>
            </div>
        </div>
    );
}

export default ImageLinkForm;