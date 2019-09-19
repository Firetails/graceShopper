import React from 'react'

const NotFound = () => {
  return (
    <div>
      <p className="errorMessage"> ✨ No luck, try a different URL. ✨</p>
      <a href="/candies">
        <img src="https://image.shutterstock.com/image-vector/404-error-page-not-found-260nw-679874572.jpg" />
      </a>
    </div>
  )
}
export default NotFound
