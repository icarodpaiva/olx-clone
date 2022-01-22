import React, { useState, useEffect } from 'react'

import { PageContainer } from '../../components/TemplateComponents'
import { PageArea } from './AdsStyled'
import AdItem from '../../components/partials/AdItem/AdItem'

import Api from '../../helpers/Api'
import { useLocation, Navigate } from 'react-router-dom'

let timer

const Ads = () => {
  const useQueryString = () => {
    return new URLSearchParams(useLocation().search)
  }
  const query = useQueryString()

  const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '')
  const [cat, setCat] = useState(
    query.get('cat') != null ? query.get('cat') : ''
  )
  const [state, setState] = useState(
    query.get('state') != null ? query.get('state') : ''
  )

  const [adsTotal, setAdsTotal] = useState(0)
  const [stateList, setStateList] = useState([])
  const [categories, setCategories] = useState([])
  const [adList, setAdList] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [resultOpacity, setResultOpacity] = useState(1)
  const [loading, setLoading] = useState(true)

  const getAdsList = async () => {
    setLoading(true)

    const offset = (currentPage - 1) * 9

    const json = await Api.getAds({
      sort: 'desc',
      limit: 9,
      q,
      cat,
      state,
      offset
    })
    setAdList(json.ads)
    setAdsTotal(json.total)
    setLoading(false)
    setResultOpacity(1)
  }

  useEffect(() => {
    if (adList.length > 0) {
      setPageCount(Math.ceil(adsTotal / adList.length))
    } else {
      setPageCount(0)
    }
  }, [adsTotal])

  useEffect(() => {
    setResultOpacity(0.3)
    getAdsList()
  }, [currentPage])

  useEffect(() => {
    let queryString = []

    if (q) {
      queryString.push(`q=${q}`)
    }
    if (cat) {
      queryString.push(`cat=${cat}`)
    }
    if (state) {
      queryString.push(`state=${state}`)
    }

    window.history.pushState('novaquery', 'Title', `?${queryString.join('&')}`)

    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(getAdsList, 2000)
    setResultOpacity(0.3)

    setCurrentPage(1)
  }, [q, cat, state])

  useEffect(() => {
    const getStates = async () => {
      const slist = await Api.getStates()
      setStateList(slist)
    }
    getStates()
  }, [])

  useEffect(() => {
    const getCategories = async () => {
      const cats = await Api.getCategories()
      setCategories(cats)
    }
    getCategories()
  }, [])

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await Api.getAds({
        sort: 'desc',
        limit: 8
      })
      setAdList(json.ads)
    }
    getRecentAds()
  }, [])

  const pagination = []
  for (let i = 1; i <= pageCount; i++) {
    pagination.push(i)
  }

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <form method="GET">
            <input
              type="text"
              name="q"
              placeholder="O que você procura?"
              value={q}
              onChange={e => setQ(e.target.value)}
            />

            <div className="filterName">Estado:</div>
            <select
              name="state"
              value={state}
              onChange={e => setState(e.target.value)}
            >
              <option value="" key=""></option>
              {stateList.map((i, k) => (
                <option value={i.name} key={k}>
                  {i.name}
                </option>
              ))}
            </select>

            <div className="filterName">Categoria:</div>
            <ul>
              {categories.map((i, k) => (
                <li
                  key={k}
                  className={
                    cat == i.slug ? 'categoryItem active' : 'categoryItem'
                  }
                  onClick={() => setCat(i.slug)}
                >
                  <img src={i.img} alt={i.name} />
                  <span>{i.name}</span>
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div className="rightSide">
          <h2>Resultados</h2>

          {loading && adList.length === 0 && (
            <div className="listWarning">Carregando...</div>
          )}
          {!loading && adList.length === 0 && (
            <div className="listWarning">Não encontramos resultados.</div>
          )}

          <div className="list" style={{ opacity: resultOpacity }}>
            {adList.map((i, k) => (
              <AdItem key={k} data={i} />
            ))}
          </div>
          <div className="pagination">
            {pagination.map((i, k) => (
              <div
                key={k}
                className={i === currentPage ? 'pagItem active' : 'pagItem'}
                onClick={() => setCurrentPage(i)}
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      </PageArea>
    </PageContainer>
  )
}

export default Ads
