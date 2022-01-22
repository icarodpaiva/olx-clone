import React, { useState, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import {
  PageContainer,
  PageTitle,
  ErrorMessage
} from '../../components/TemplateComponents'
import { PageArea } from './AddAdStyled'

import Api from '../../helpers/Api'
import { doLogin } from '../../helpers/AuthHandler'

const AddAd = () => {
  const [categories, setCategories] = useState([])

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [priceNegotiable, setPriceNegotiable] = useState(false)
  const [desc, setDesc] = useState('')

  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')

  const fileField = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const getCategorys = async () => {
      const cats = await Api.getCategories()
      setCategories(cats)
    }
    getCategorys()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setDisabled(true)
    setError('')

    const errors = []

    if (!title.trim()) {
      errors.push('Sem título')
    }
    if (!category) {
      errors.push('Sem categoria')
    }
    if (errors.length === 0) {
      const fData = new FormData()
      fData.append('title', title)
      fData.append('price', price)
      fData.append('priceneg', priceNegotiable)
      fData.append('desc', desc)
      fData.append('cat', category)

      if (fileField.current.files.length > 0) {
        for (let i in fileField.current.files) {
          fData.append('img', fileField.current.files[i])
        }
      }

      const json = await Api.addAd(fData)

      if (!json.error) {
        navigate(`/ad/${json.id}`)
        return
      } else {
        setError(json.error)
      }
    } else {
      setError(errors.join('\n'))
    }

    setDisabled(false)
  }

  return (
    <PageContainer>
      <PageTitle>Postar um anuncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Título</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Categoria</div>
            <div className="area--input">
              <select
                disabled={disabled}
                onChange={e => setCategory(e.target.value)}
                required
              >
                <option></option>
                {categories &&
                  categories.map(i => (
                    <option key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço</div>
            <div className="area--input">
              <input
                type="number"
                value={price}
                disabled={disabled || priceNegotiable}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço Negociável</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={disabled}
                checked={priceNegotiable}
                onChange={() => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Descrição</div>
            <div className="area--input">
              <textarea
                disabled={disabled}
                value={desc}
                onChange={e => setDesc(e.target.value)}
              ></textarea>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Imagens (1 ou mais)</div>
            <div className="area--input">
              <input type="file" disabled={disabled} multiple ref={fileField} />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Adicionar Anúncio</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  )
}

export default AddAd
