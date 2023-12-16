import walletService from "../services/wallet-service"
import { useSessionStore } from "../store/session"
import logoImage from '../assets/logo.png'

export default function Header() {
  const { session, computed: { loggedIn } } = useSessionStore()

  return (
    <header className="container mx-auto flex justify-between p-4">
      <div className="-rotate-3 translate-y-1">
        <img src={logoImage.src} width={200} height={200} className="invert animate-bounce" />
      </div>

      {loggedIn ? (
        <div className="flex items-center gap-2">
          <span>{session?.actor.toString()}</span>
          <button className="button" onClick={() => walletService.logout()}>Logout</button>
        </div>
      ) : (
        <button className="button" onClick={() => walletService.login()}>Login</button>
      )}
    </header>
  )
}