import Pusher from 'pusher-js'

export const usePusher = () => {
    const messages = ref([])

    if (process.client) {
        const pusher = new Pusher(
            'SUA_PUSHER_KEY',
            { cluster: 'SUA_CLUSTER' }
        )

        const channel = pusher.subscribe('events')

        channel.bind('new-message', (data) => {
            messages.value.push({
                ...data,
                at: Date.now()
            })
        })
    }

    return { messages }
}
