/* tslint:disable */
/* eslint-disable */
/**
 * Flavorite - OpenAPI 3.0
 * This is a Flavorite Server based on the OpenAPI 3.0 specification.
 *
 * The version of the OpenAPI document: 1.1.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    ListRestaurants,
    ListRestaurantsFromJSON,
    ListRestaurantsToJSON,
    ListReviews,
    ListReviewsFromJSON,
    ListReviewsToJSON,
} from '../models';

export interface GetRestaurantsRequest {
    longitude: number;
    latitude: number;
    radius: number;
}

export interface GetReviewByRestaurantRequest {
    restaurantId: string;
}

/**
 * 
 */
export class RestaurantsApi extends runtime.BaseAPI {

    /**
     * Returns all restauarants in given location radius
     * Find restaurants in user location given
     */
    async getRestaurantsRaw(requestParameters: GetRestaurantsRequest): Promise<runtime.ApiResponse<ListRestaurants>> {
        if (requestParameters.longitude === null || requestParameters.longitude === undefined) {
            throw new runtime.RequiredError('longitude','Required parameter requestParameters.longitude was null or undefined when calling getRestaurants.');
        }

        if (requestParameters.latitude === null || requestParameters.latitude === undefined) {
            throw new runtime.RequiredError('latitude','Required parameter requestParameters.latitude was null or undefined when calling getRestaurants.');
        }

        if (requestParameters.radius === null || requestParameters.radius === undefined) {
            throw new runtime.RequiredError('radius','Required parameter requestParameters.radius was null or undefined when calling getRestaurants.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.longitude !== undefined) {
            queryParameters['longitude'] = requestParameters.longitude;
        }

        if (requestParameters.latitude !== undefined) {
            queryParameters['latitude'] = requestParameters.latitude;
        }

        if (requestParameters.radius !== undefined) {
            queryParameters['radius'] = requestParameters.radius;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/restaurants`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListRestaurantsFromJSON(jsonValue));
    }

    /**
     * Returns all restauarants in given location radius
     * Find restaurants in user location given
     */
    async getRestaurants(requestParameters: GetRestaurantsRequest): Promise<ListRestaurants> {
        const response = await this.getRestaurantsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns all reviews for a single restaurant
     * Find reviews by restaurant
     */
    async getReviewByRestaurantRaw(requestParameters: GetReviewByRestaurantRequest): Promise<runtime.ApiResponse<ListReviews>> {
        if (requestParameters.restaurantId === null || requestParameters.restaurantId === undefined) {
            throw new runtime.RequiredError('restaurantId','Required parameter requestParameters.restaurantId was null or undefined when calling getReviewByRestaurant.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/restaurants/{restaurantId}/reviews`.replace(`{${"restaurantId"}}`, encodeURIComponent(String(requestParameters.restaurantId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListReviewsFromJSON(jsonValue));
    }

    /**
     * Returns all reviews for a single restaurant
     * Find reviews by restaurant
     */
    async getReviewByRestaurant(requestParameters: GetReviewByRestaurantRequest): Promise<ListReviews> {
        const response = await this.getReviewByRestaurantRaw(requestParameters);
        return await response.value();
    }

}
