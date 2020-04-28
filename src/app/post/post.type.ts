export type PostType = {
    comment: string
    name: string,
    txid: number,
    created_at: string,
    created_at_fromNow?: string,
    currentUser?: boolean
}