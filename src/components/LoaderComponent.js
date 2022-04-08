import React from 'react'
import FadeLoader from 'react-spinners'

export function LoaderComponent()  {
    return (
        <div className="spinner-container">
          <FadeLoader></FadeLoader>
        </div>
      );
}
