import { useEffect } from "react";
import Game from "../game";
import Header from "../header";
import walletService from "../../services/wallet-service";

export default function Home() {
  useEffect(() => {
    walletService.restoreSession()
  }, [])

  return (
    <div className="flex-grow flex flex-col bg-gradient-to-br from-red-200 to-blue-400">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex justify-center">
        <Game />
      </main>
      <footer className="container mx-auto flex flex-col items-center text-sm text-gray-700 py-4">
        <p><a href="https://www.freepik.com/free-ai-image/cute-ai-generated-cartoon-bunny_40572276.htm#fromView=search&term=tamagotchi&page=1&position=43&track=ais_ai_generated&regularType=ai&uuid=9cc25ac2-32bf-404b-acc4-cec50a203ae0">Image By freepik</a></p>
      </footer>
    </div>
  )
}