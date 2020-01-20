const env = process.env.NODE_ENV || 'dev'

const config = () => {
    switch (env) {
        case 'dev':
            return{
                db: 'mongodb+srv://brino:123@cluster0-njrky.azure.mongodb.net/week10?retryWrites=true&w=majority'
            }
    }
}
module.exports = config()