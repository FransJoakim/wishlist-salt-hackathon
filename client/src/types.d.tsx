type UserId = string;

export interface ItemStructure {
    item_id: string
    title: string
    description: string
    links: string[]
    interestedGifters?: UserId[]
    numberofInterestedGifters?: number
    gifter?: UserId[]
    numberofGifters?: number
}

export interface ListStructure {
    list_id: string
    name: string
    events: string[]
    items: ItemStructure[]
}

export interface UserStateInterface {
    user_id: UserId
    username: string
    relations: string[]
    organized_events: string[]
    lists: ListStructure[]
}