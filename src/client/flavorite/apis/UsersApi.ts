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
    CreateUser,
    CreateUserFromJSON,
    CreateUserToJSON,
    ListFavoriteFoods,
    ListFavoriteFoodsFromJSON,
    ListFavoriteFoodsToJSON,
    ListFriends,
    ListFriendsFromJSON,
    ListFriendsToJSON,
    ListReviews,
    ListReviewsFromJSON,
    ListReviewsToJSON,
    LoginPayload,
    LoginPayloadFromJSON,
    LoginPayloadToJSON,
    LoginUser,
    LoginUserFromJSON,
    LoginUserToJSON,
    UpdateUser,
    UpdateUserFromJSON,
    UpdateUserToJSON,
    User,
    UserFromJSON,
    UserToJSON,
} from '../models';

export interface CreateUserRequest {
    createUser: CreateUser;
}

export interface DeleteFriendsRequest {
    username: string;
}

export interface DeleteUserRequest {
    username: string;
}

export interface GetFavoriteFoodsRequest {
    username: string;
}

export interface GetFriendsRequest {
    username: string;
}

export interface GetReviewsByUsernameRequest {
    username: string;
}

export interface GetUserByNameRequest {
    username: string;
}

export interface LoginUserRequest {
    loginUser: LoginUser;
}

export interface UpdateFavoriteFoodsRequest {
    username: string;
    listFavoriteFoods?: ListFavoriteFoods;
}

export interface UpdateFriendsRequest {
    username: string;
}

export interface UpdateUserRequest {
    username: string;
    updateUser: UpdateUser;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * This can only be done by the logged in user.
     * Create user
     */
    async createUserRaw(requestParameters: CreateUserRequest): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.createUser === null || requestParameters.createUser === undefined) {
            throw new runtime.RequiredError('createUser','Required parameter requestParameters.createUser was null or undefined when calling createUser.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUserToJSON(requestParameters.createUser),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * This can only be done by the logged in user.
     * Create user
     */
    async createUser(requestParameters: CreateUserRequest): Promise<User> {
        const response = await this.createUserRaw(requestParameters);
        return await response.value();
    }

    /**
     * Remove all connections to friends of a user
     */
    async deleteFriendsRaw(requestParameters: DeleteFriendsRequest): Promise<runtime.ApiResponse<ListFriends>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling deleteFriends.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/{username}/friends`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListFriendsFromJSON(jsonValue));
    }

    /**
     * Remove all connections to friends of a user
     */
    async deleteFriends(requestParameters: DeleteFriendsRequest): Promise<ListFriends> {
        const response = await this.deleteFriendsRaw(requestParameters);
        return await response.value();
    }

    /**
     * This can only be done by the logged in user.
     * Delete user
     */
    async deleteUserRaw(requestParameters: DeleteUserRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling deleteUser.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This can only be done by the logged in user.
     * Delete user
     */
    async deleteUser(requestParameters: DeleteUserRequest): Promise<void> {
        await this.deleteUserRaw(requestParameters);
    }

    /**
     * Get favorite foods of a user
     */
    async getFavoriteFoodsRaw(requestParameters: GetFavoriteFoodsRequest): Promise<runtime.ApiResponse<ListFavoriteFoods>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling getFavoriteFoods.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/{username}/favorite-foods`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListFavoriteFoodsFromJSON(jsonValue));
    }

    /**
     * Get favorite foods of a user
     */
    async getFavoriteFoods(requestParameters: GetFavoriteFoodsRequest): Promise<ListFavoriteFoods> {
        const response = await this.getFavoriteFoodsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get friends of a user
     */
    async getFriendsRaw(requestParameters: GetFriendsRequest): Promise<runtime.ApiResponse<ListFriends>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling getFriends.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/{username}/friends`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListFriendsFromJSON(jsonValue));
    }

    /**
     * Get friends of a user
     */
    async getFriends(requestParameters: GetFriendsRequest): Promise<ListFriends> {
        const response = await this.getFriendsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns all reviews by a single user
     * Get reviews by user name
     */
    async getReviewsByUsernameRaw(requestParameters: GetReviewsByUsernameRequest): Promise<runtime.ApiResponse<ListReviews>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling getReviewsByUsername.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/{username}/reviews`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListReviewsFromJSON(jsonValue));
    }

    /**
     * Returns all reviews by a single user
     * Get reviews by user name
     */
    async getReviewsByUsername(requestParameters: GetReviewsByUsernameRequest): Promise<ListReviews> {
        const response = await this.getReviewsByUsernameRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get user by user name
     */
    async getUserByNameRaw(requestParameters: GetUserByNameRequest): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling getUserByName.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * Get user by user name
     */
    async getUserByName(requestParameters: GetUserByNameRequest): Promise<User> {
        const response = await this.getUserByNameRaw(requestParameters);
        return await response.value();
    }

    /**
     * Logs user into the system
     */
    async loginUserRaw(requestParameters: LoginUserRequest): Promise<runtime.ApiResponse<LoginPayload>> {
        if (requestParameters.loginUser === null || requestParameters.loginUser === undefined) {
            throw new runtime.RequiredError('loginUser','Required parameter requestParameters.loginUser was null or undefined when calling loginUser.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/users/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginUserToJSON(requestParameters.loginUser),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LoginPayloadFromJSON(jsonValue));
    }

    /**
     * Logs user into the system
     */
    async loginUser(requestParameters: LoginUserRequest): Promise<LoginPayload> {
        const response = await this.loginUserRaw(requestParameters);
        return await response.value();
    }

    /**
     * Logs out current logged in user session
     */
    async logoutUserRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Logs out current logged in user session
     */
    async logoutUser(): Promise<void> {
        await this.logoutUserRaw();
    }

    /**
     * This can only be done by the logged in user.
     * Update favorite foods of a user
     */
    async updateFavoriteFoodsRaw(requestParameters: UpdateFavoriteFoodsRequest): Promise<runtime.ApiResponse<ListFavoriteFoods>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling updateFavoriteFoods.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/users/{username}/favorite-foods`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ListFavoriteFoodsToJSON(requestParameters.listFavoriteFoods),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListFavoriteFoodsFromJSON(jsonValue));
    }

    /**
     * This can only be done by the logged in user.
     * Update favorite foods of a user
     */
    async updateFavoriteFoods(requestParameters: UpdateFavoriteFoodsRequest): Promise<ListFavoriteFoods> {
        const response = await this.updateFavoriteFoodsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update friends of a user
     */
    async updateFriendsRaw(requestParameters: UpdateFriendsRequest): Promise<runtime.ApiResponse<ListFriends>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling updateFriends.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/{username}/friends`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListFriendsFromJSON(jsonValue));
    }

    /**
     * Update friends of a user
     */
    async updateFriends(requestParameters: UpdateFriendsRequest): Promise<ListFriends> {
        const response = await this.updateFriendsRaw(requestParameters);
        return await response.value();
    }

    /**
     * This can only be done by the logged in user.
     * Update user
     */
    async updateUserRaw(requestParameters: UpdateUserRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling updateUser.');
        }

        if (requestParameters.updateUser === null || requestParameters.updateUser === undefined) {
            throw new runtime.RequiredError('updateUser','Required parameter requestParameters.updateUser was null or undefined when calling updateUser.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/users/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateUserToJSON(requestParameters.updateUser),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * This can only be done by the logged in user.
     * Update user
     */
    async updateUser(requestParameters: UpdateUserRequest): Promise<void> {
        await this.updateUserRaw(requestParameters);
    }

}
