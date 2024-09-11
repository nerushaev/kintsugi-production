import { createSelector } from 'reselect';

export const selectAuthState = (state) => state.auth;

export const makeSelectIsProductInWishList = (product_id) =>
  createSelector([selectAuthState], (auth) => auth.user.wishes?.includes(product_id));

export const selectWishes = createSelector(
  [selectAuthState], (auth) => auth.user.wishes
)

export const selectIsLogin = createSelector(
  [selectAuthState],
  (auth) => auth.isLogin
);

export const selectIsUserLoading = createSelector(
  [selectAuthState],
  (auth) => auth.isLoading
);

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectError = ({ auth }) => auth.error;

export const selectToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

export const selectRole = createSelector(
  [selectAuthState],
  (auth) => auth.user.role
);

export const selectIsFavorite = ({ auth }) => auth.user.favorites;

export const selectUserId = ({ auth }) => auth.user._id;

export const selectIsAvatarLoading = ({ auth }) => auth.loadingAvatar;

export const selectResponse = ({ auth }) => auth.response;

export const selectChangePassResponse = ({ auth }) => auth.changePassResponse;

export const selectIsSuccess = ({auth}) => auth.success;

export const selectLocation = ({auth}) => auth.location;
