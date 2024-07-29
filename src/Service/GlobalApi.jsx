import axios from "axios"

const BASE_URL='https://places.googleapis.com/v1/places:searchText'

const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':"AIzaSyCmXwngTZ1ehzQDY-Ju_tJQy1BISrmulwk",
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]

    }
}

export const GetPlacesDetails=(data)=>axios.post(BASE_URL,data,config)
export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=1000&key='+'AIzaSyCmXwngTZ1ehzQDY-Ju_tJQy1BISrmulwk'
