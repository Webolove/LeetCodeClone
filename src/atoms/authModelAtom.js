import { atom } from "recoil"

const initialAuthState = {
  isOpen: false,
  type: "login"
}

export const authModelState = atom({
  key: "authModelState",
  default: initialAuthState
})
