import Navigation from './Navigation'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout