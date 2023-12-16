import { useSessionStore } from "../store/session"
import { useTamagotchiStore } from "../store/tamagotchi"
import mascotImage from '../assets/mascot.png'

export default function Game() {
  const { computed: { loggedIn } } = useSessionStore()
  const { food, happiness, computed: { created, alive } } = useTamagotchiStore()

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <img src={mascotImage.src} width={200} />

      <div className="rounded-xl p-4 bg-white max-w-sm flex flex-col gap-2">
        {!loggedIn ? (
          <>
            <p>Welcome to <b>Tamagotchi</b> game!</p>
            <p>Click the 'Login' button on the top right and start playing!</p>
          </>
        ) : (
          !created && (
            <p></p>
          )
        )}
      </div>
    </div>
  )
}