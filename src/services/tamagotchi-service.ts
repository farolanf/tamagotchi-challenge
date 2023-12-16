import type { Session } from "@wharfkit/session"
import { useSessionStore } from "../store/session"
import { useTamagotchiStore } from "../store/tamagotchi"
import { CONTRACT, SEC_PER_TICK } from "../constants"

export interface Pet {
  food: number
  happiness: number
  last_ticked: number
}

class TamagotchiService {

  get session(): Session | undefined {
    return useSessionStore.getState().session
  }

  get owner(): string {
    return this.session?.actor.toString() || ''
  }

  create() {
    this.transact('create', { owner: this.owner })
  }

  feed() {
    this.transact('feed', { owner: this.owner })
  }

  play() {
    this.transact('play', { owner: this.owner })
  }

  async refresh(fetchNew = true) {
    if (!this.session) return

    let pet: Pet | undefined = useTamagotchiStore.getState().pet

    if (fetchNew || !pet) {
      pet = await this.session!.client.v1.chain.get_table_rows({
        code: CONTRACT,
        scope: this.owner,
        table: 'pets',
        json: true,
      }).then(result => {
        console.log(result)
        return result.rows[0] || null
      }).catch(error => {
        console.error(error)
        return null
      })
    }

    if (pet) {
      const now = Date.now() / 1000
      const elapsed = now - pet.last_ticked
      const ticks = Math.floor(elapsed / SEC_PER_TICK)

      pet.food = Math.max(0, pet.food - ticks)
      pet.happiness = Math.max(0, pet.happiness - ticks)
      pet.last_ticked += ticks * SEC_PER_TICK
    }

    useTamagotchiStore.setState({ pet })
  }

  private async transact(action: string, data: any) {
    if (!this.session) return

    const result = await this.session.transact({
      actions: [{
        account: CONTRACT,
        name: action,
        authorization: [this.session.permissionLevel],
        data,
      }]
    }).then(result => {
      console.log(result)
      return result
    }).catch(error => {
      console.error(error)
      return null
    })

    result && setTimeout(async () => {
      await this.refresh()
    }, 1000)

    useTamagotchiStore.setState({ error: result ? undefined : 'Something went wrong, please try again.' })
  }
}

const tamagotchiService = new TamagotchiService()

export default tamagotchiService