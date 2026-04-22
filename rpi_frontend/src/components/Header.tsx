function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg border-b border-blue-800/30 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shadow-inner">
              <svg className="w-6 h-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h-1m-1 4h-1m-1-12h-1m2-12h2a2 2 0 012 2v2m4 0v2m4 0v2m-6-4h2m0 0h2m-2 0h-5m-2 2h16m-16 0a1 1 0 01-1-1V5a1 1 0 011-1h14a1 1 0 011 1v4a1 1 0 01-1 1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">RPI Catamarca</h1>
              <p className="text-xs text-blue-200/80 font-medium">Universidad Nacional</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-xs text-blue-200/80 px-3 py-1.5 bg-blue-950/50 rounded-full border border-blue-700/30">
              Sistema de Gestión de Prácticas de Laboratorio
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-200">Sistema Online</span>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button className="p-2 hover:bg-blue-800/50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
