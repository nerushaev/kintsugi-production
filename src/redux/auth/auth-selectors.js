export const selectIsLogin = ({ auth }) => auth.isLogin;

export const selectIsUserLoading = ({ auth }) => auth.isLoading;

export const selectUser = ({ auth }) => auth.user;

export const selectError = ({ auth }) => auth.error;

export const selectToken = ({ auth }) => auth.token;

export const selectIsFavorite = ({ auth }) => auth.user.favorites;

export const selectUserId = ({ auth }) => auth.user._id;

export const selectIsAvatarLoading = ({ auth }) => auth.loadingAvatar;

export const selectRole = ({ auth }) => auth.user.role;

export const selectResponse = ({ auth }) => auth.response;