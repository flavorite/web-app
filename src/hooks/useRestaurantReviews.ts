import { ListReviews } from '../client/flavorite/models'
import  Api from '../client/flavorite'
import { useQuery } from 'react-query';
import { GetReviewByRestaurantRequest } from '../client/flavorite/apis';


export default function useRestaurantReviews(restaurantId: GetReviewByRestaurantRequest) {

    // const fetchRestaurantReviews = Api.Restaurants.getReviewByRestaurant(restaurantId)
    // const Reviews = useQuery(['reviewsByRestaurant', restaurantId], () => fetchRestaurantReviews);


    const reviewsList: ListReviews = {
        reviews: [
        {
        id: 1,
        userId: 2,
        restaurantId: 1,
        content: 'this is a good restaurant',
        rating: 5
        },
        {
        id: 2,
        userId: 1,
        restaurantId: 1,
        content: 'pretty good',
        rating: 4
        }


    ]}

    return {
        // loading: Reviews.isLoading,
        // error: Reviews.isError,
        // user: Reviews.data
        loading: false,
        error: null,
        reviews: reviewsList.reviews
    }
}
