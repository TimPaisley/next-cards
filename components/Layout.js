export default function Layout({ children }) {
  return (
    <div className="bg-gray-200 h-screen flex items-center">
      <div className="bg-white relative flex h-full max-h-[932px] w-full max-w-[432px] flex-col m-auto">
        {children}
      </div>
    </div>
  )
}
