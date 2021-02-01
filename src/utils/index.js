import date from './date'
import validate from './validate'
import util from './util'
import widget from './widget'

const logger = {
    log(message) {
        if (process.env.NODE_ENV != 'production') {
            console.log(message)
        }
    }
}

export { logger, date, validate, util, widget }
