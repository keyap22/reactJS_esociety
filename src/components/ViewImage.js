import React from 'react'
import {Image, CloudinaryContext} from "cloudinary-react"

export const ViewImage = () => {
    return (
        <>
            <CloudinaryContext cloudName="kpproject-esociety">
                <div>
                <Image publicId="cld-sample" width="0.5" />
                </div>
            </CloudinaryContext>
        </>
    )
}