import React from 'react'
import { Item } from './AdItemStyled'
import { Link } from 'react-router-dom'

const AdItem = props => {
  const convertPrice = value => {
    if (props.data.priceNegotiable) {
      return 'Preço Negociável'
    } else {
      return value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })
    }
  }
  let price = convertPrice(props.data.price)

  return (
    <Item className="aditem">
      <Link to={`/ad/${props.data.id}`}>
        <div className="itemImage">
          <img src="https://via.placeholder.com/200" alt={props.data.title} />
        </div>
        <div className="itemName">{props.data.title}</div>
        <div className="itemPrice">{price}</div>
      </Link>
    </Item>
  )
}

export default AdItem
