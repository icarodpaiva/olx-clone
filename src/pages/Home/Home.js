import React, { useState, useEffect } from 'react'

import { PageContainer } from '../../components/TemplateComponents'
import { SearchArea, PageArea } from './HomeStyled'
import AdItem from '../../components/partials/AdItem/AdItem'

import Api from '../../helpers/Api'
import { Link } from 'react-router-dom'

const Home = () => {
  const [stateList, setStateList] = useState([])
  const [categories, setCategories] = useState([])
  const [adList, setAdList] = useState([])

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

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state">
                {stateList.map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>

          <div className="categoryList">
            {categories.map((item, index) => (
              <Link
                key={index}
                to={`/ads?cat=${item.slug}`}
                className="categoryItem"
              >
                <img src={item.img} alt={item.name} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>

      <PageContainer>
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <div className="list">
            {adList.map((i, k) => (
              <AdItem key={k} data={i} />
            ))}
          </div>
          <Link to="/ads" className="seeAllLink">
            Ver todos
          </Link>
          <hr />
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem
        </PageArea>
      </PageContainer>
    </>
  )
}

export default Home
