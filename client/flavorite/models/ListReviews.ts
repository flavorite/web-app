/* tslint:disable */
/* eslint-disable */
/**
 * Flavorite - OpenAPI 3.0
 * This is a Flavorite Server based on the OpenAPI 3.0 specification. 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Review,
    ReviewFromJSON,
    ReviewFromJSONTyped,
    ReviewToJSON,
} from './';

/**
 * 
 * @export
 * @interface ListReviews
 */
export interface ListReviews {
    /**
     * 
     * @type {Array<Review>}
     * @memberof ListReviews
     */
    reviews: Array<Review>;
}

export function ListReviewsFromJSON(json: any): ListReviews {
    return ListReviewsFromJSONTyped(json, false);
}

export function ListReviewsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListReviews {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'reviews': ((json['reviews'] as Array<any>).map(ReviewFromJSON)),
    };
}

export function ListReviewsToJSON(value?: ListReviews | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'reviews': ((value.reviews as Array<any>).map(ReviewToJSON)),
    };
}

