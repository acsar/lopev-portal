import Pusher from 'pusher-js'

export const usePusher = (userId) => {
    const messages = ref([])

    if (process.client) {
        const pusher = new Pusher(
            '03dd51c33f763b613a2f',
            { cluster: 'sa1' }
        )

        const channel = pusher.subscribe(`client-${userId}`)

        channel.bind('update', (data) => {
            messages.value.push({
                ...data,
                id: Date.now()
            })
        })
    }

    return { messages }
}
