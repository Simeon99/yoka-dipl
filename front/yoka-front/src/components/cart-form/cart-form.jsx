import React from 'react'

import './cart-form.scss'

export default function CartForm({deliveryTipe}) {
  return (
    
    <div>{deliveryTipe ? <div>Picku up</div> : <div>Delivery</div>}</div>
  )
}
