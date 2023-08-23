import { createStore } from 'vuex'
import User from '@/models/User'

export default createStore({
  state() {
    return {
      currentUser: User
    }
  }
})
