import walletService from "../services/wallet-service"
import { useSessionStore } from "../store/session"

export default function Header() {
  const { session, computed: { loggedIn } } = useSessionStore()

  return (
    <header className="container mx-auto flex justify-between p-4">
      <span>Logo</span>
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