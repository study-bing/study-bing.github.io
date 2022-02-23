const path = require('path')
class Notifier {
    apply(compiler) {
        compiler.plugin('done', stats => {
            const pkg = require('../package.json')
            const notifier = require('node-notifier')
            const time = ((stats.endTime - stats.startTime) / 1000).toFixed(2)

            notifier.notify({
                title: pkg.name,
                message: `WebPack is done!\n${stats.compilation.errors.length} errors in ${time}s`,
                icon: path.join(__dirname, '../src/assets/img/market/bule-icon.png'),
            })
            // notifier.on('click', (notifierObject, options, event) => {
            //     // Triggers if `wait: true` and user clicks notification
            //   });

        })
    }
}

module.exports = Notifier
