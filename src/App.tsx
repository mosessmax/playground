import './App.css'
import CurrentTime from './components/CurrentTime'

export default function App() {
  return (
    <footer className="pt-8">
      {/* <hr className="border-t border-body/10" /> */}
     <hr className="h-px border-0 bg-title/10" />
     <div className="flex items-center justify-between pt-4 mx-1 md:mx-3">
       <CurrentTime />
        <span className="text-xs text-body">&copy; 2024 Moses Adebayo 💌</span>
     </div>
 </footer>
  )
}
