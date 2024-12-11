import { AuthProvider } from "./contexts/authProvider"
import Router from "./router"
import { BrowserRouter } from "react-router-dom"
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
