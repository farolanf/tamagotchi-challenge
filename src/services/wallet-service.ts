import { SessionKit, Chains } from '@wharfkit/session'
import { WalletPluginPrivateKey } from '@wharfkit/wallet-plugin-privatekey'
import WebRenderer from '@wharfkit/web-renderer'
import { useSessionStore } from '../store/session'

const TEST_PRIVATE_KEY = '5JaRyWL4mKxB3t1zeLLYWuUkfEiXWr5NdBtMcXkDv5wXC9JN4Bo'

class WalletService {
  private _sessionKit?: SessionKit

  private get sessionKit(): SessionKit {
    return this._sessionKit ||= new SessionKit({
      appName: 'tamagotchi',
      chains: [Chains.Jungle4],
      ui: new WebRenderer(),
      walletPlugins: [
        new WalletPluginPrivateKey(TEST_PRIVATE_KEY),
      ]
    })
  }

  async restoreSession() {
    const session = await this.sessionKit.restore()
    useSessionStore.setState({ session })
  }

  async login() {
    const response = await this.sessionKit.login()
    useSessionStore.setState({ session: response.session })
  }

  async logout() {
    await this.sessionKit.logout()
    useSessionStore.setState({ session: undefined })
  }
}

const walletService = new WalletService()

export default walletService