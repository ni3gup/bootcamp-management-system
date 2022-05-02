import { Injectable } from "@nestjs/common"
import * as NodeGeocoder from 'node-geocoder'

@Injectable()
export class GeocoderService {
    constructor() { }

    private getGeocoder() {
        return NodeGeocoder({
            provider: process.env.GEOCODER_PROVIDER as any || 'mapquest',
            httpAdapter: 'https',
            apiKey: process.env.GEOCODER_API_KEY,
            formatter: null,
        })
    }

    async getLocation(address: string) {
        const geocoder = this.getGeocoder()

        const loc = await geocoder.geocode(address)

        return {
            address_type: 'Point',
            latitude: loc[0].latitude,
            longitude: loc[0].longitude,
            formatted_address: loc[0].formattedAddress,
            street: loc[0].streetName,
            city: loc[0].city,
            state: loc[0].stateCode,
            pincode: loc[0].zipcode,
            country: loc[0].countryCode
        }
    }
}