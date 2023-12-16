import { useSessionStore } from "../store/session"
import { useTamagotchiStore } from "../store/tamagotchi"
import mascotImage from '../assets/mascot.png'
import tamagotchiService from "../services/tamagotchi-service"
import HBar from "./hbar"
import { useEffect, useState } from "react"
import { useInterval } from "../hooks/use-interval"

export default function Game() {
  const [loading, setLoading] = useState(true)
  const { ready, computed: { loggedIn } } = useSessionStore()
  const { pet, error, computed: { created, alive }, reset } = useTamagotchiStore()

  const isLoading = !ready || (loggedIn && loading)

  useEffect(() => {
    loggedIn && tamagotchiService.refresh().then(() => setLoading(false))

    !loggedIn && reset()
  }, [loggedIn])

  useInterval(() => {
    alive && tamagotchiService.refresh(false)
  }, 1000);

  if (isLoading) return null

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <img src={mascotImage.src} width={200} alt="cute pet" />

      <div className="rounded-xl p-4 bg-white max-w-sm flex flex-col gap-3">
        {!loggedIn ? (
          <>
            <p>Welcome to <b>Tamagotchi</b> game!</p>
            <p>Click the 'Login' button on the top right and start playing!</p>
          </>
        ) : (
          !created ? (
            <>
              <p>It's your first time!</p>
              <p>Alright, let's adopt one of my friends.</p>
              <button className="self-start button" onClick={() => tamagotchiService.create()}>Start game</button>
            </>
          ) : !alive ? (
            <>
              <p>Your <b>Tamagotchi</b> has <span className="danger">died</span>!</p>
              <a href="https://giphy.com/gifs/embarrassed-facepalm-panda-14aUO0Mf7dWDXW">
                <iframe src="https://giphy.com/embed/14aUO0Mf7dWDXW" width="280" height="280" />
              </a>
              <button className="self-start button" onClick={() => tamagotchiService.create()}>Restart game</button>
            </>
          ) : pet && (
            <>
              <div className="w-[240px] flex flex-col gap-2">
                <HBar title="Food" color="bg-red-400" value={pet.food / 100} />
                <HBar title="Happiness" color="bg-green-300" value={pet.happiness / 100} />
              </div>
              <div className="flex gap-2">
                <button className="button flex-grow" onClick={() => tamagotchiService.feed()}>Feed</button>
                <button className="button flex-grow" onClick={() => tamagotchiService.play()}>Play</button>
              </div>
            </>
          )
        )}

        {error && <p className="danger">{error}</p>}
      </div>
    </div>
  )
}