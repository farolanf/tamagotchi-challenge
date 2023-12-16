import { SessionKit, Chains } from '@wharfkit/session'
import { WalletPluginPrivateKey } from '@wharfkit/wallet-plugin-privatekey'
import { TransactPluginResourceProvider } from '@wharfkit/transact-plugin-resource-provider'
import WebRenderer from '@wharfkit/web-renderer'
import { useSessionStore } from '../store/session'
import { TEST_PRIVATE_KEY } from '../constants'

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
    }, {
      transactPlugins: [
        new TransactPluginResourceProvider()
      ]
    })
  }

  async restoreSession() {
    const session = await this.sessionKit.restore()
    useSessionStore.setState({ session, ready: true })
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