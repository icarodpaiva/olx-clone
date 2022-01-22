import './App.css'
import { MainRoutes } from './Routes'

import { Template } from './components/TemplateComponents'
import Header from './components/partials/Header/Header'
import Footer from './components/partials/Footer/Footer'

const App = () => {
  return (
    <div className="App">
      <Template>
        <Header />
        <MainRoutes />
        <Footer />
      </Template>
    </div>
  )
}

export default App
