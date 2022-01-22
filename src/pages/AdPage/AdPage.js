import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

import { PageContainer } from '../../components/TemplateComponents'
import { PageArea, Fake, OthersArea, BreadCrumb } from './AdPageStyled'

import Api from '../../helpers/Api'
import AdItem from '../../components/partials/AdItem/AdItem'

const AdPage = () => {
  const [loading, setLoading] = useState(true)
  const [adInfo, setAdInfo] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const getAdInfo = async () => {
      const json = await Api.getAd(id, true)
      setAdInfo(json)
      setLoading(false)
    }
    getAdInfo()
  }, [])

  const formateDate = date => {
    const cDate = new Date(date)

    const month = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ]
    const cDay = cDate.getDate()
    const cMonth = cDate.getMonth()
    const cYear = cDate.getFullYear()

    return `${cDay} de ${month[cMonth]} de ${cYear}`
  }

  const convertPrice = value => {
    if (adInfo.priceNegotiable) {
      return 'Preço Negociável'
    } else {
      return value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })
    }
  }

  return (
    <PageContainer>
      {adInfo.category && (
        <BreadCrumb>
          Você está aqui:
          <Link to="/">Home</Link>/
          <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>/
          <Link
            to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}
          >
            {adInfo.category.name}
          </Link>
          / {adInfo.title}
        </BreadCrumb>
      )}

      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {adInfo.images && (
                <Slide>
                  {adInfo.images.map((img, k) => (
                    <div key={k} className="each-slide">
                      <img src={img} alt={adInfo.title} />
                    </div>
                  ))}
                </Slide>
              )}
            </div>
            <div className="adInfo">
              <div className="adName">
                {loading && <Fake height={20} />}
                {adInfo.title && <h2>{adInfo.title}</h2>}
                {adInfo.dateCreated && (
                  <small>Criado {formateDate(adInfo.dateCreated)}</small>
                )}
              </div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo.description}
                <hr />
                {adInfo.views && <small>Visualizações: {adInfo.views}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake height={20} />}
            {adInfo.priceNegotiable && 'Preço Negociável'}
            {!adInfo.priceNegotiable && adInfo.price && (
              <div className="price">
                Preço: <span>{convertPrice(adInfo.price)}</span>
              </div>
            )}
          </div>
          {loading && <Fake height={50} />}
          {adInfo.userInfo && (
            <>
              <a
                href={`mailto:${adInfo.userInfo.email}`}
                target="_blank"
                className="contactSellerLink"
              >
                Fale com o vendedor
              </a>
              <div className="box box--padding createdBy">
                <strong>{adInfo.userInfo.name}</strong>
                <small>Email: {adInfo.userInfo.email} </small>
                <small>Estado: {adInfo.stateName} </small>
              </div>
            </>
          )}
        </div>
      </PageArea>

      <OthersArea>
        {adInfo.others && (
          <>
            <h2>Outras ofertas do vendedor:</h2>
            <div className="list">
              {adInfo.others.map((i, k) => (
                <AdItem key={k} data={i} />
              ))}
            </div>
          </>
        )}
      </OthersArea>
    </PageContainer>
  )
}

export default AdPage
