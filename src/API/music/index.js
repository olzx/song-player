import instance from "./instance"
import getModule from './get'

export default {
    get: getModule(instance)
}