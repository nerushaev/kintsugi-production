export const selectIsLogin = ({ auth }) => auth.isLogin;

export const selectIsLoading = ({ auth }) => auth.loading;

export const selectUser = ({ auth }) => auth.user;

export const selectError = ({ auth }) => auth.error;

export const selectToken = ({ auth }) => auth.token;

export const selectIsFavorite = ({ auth }) => auth.user.favorites;

export const selectUserId = ({ auth }) => auth.user._id;

export const selectIsAvatarLoading = ({ auth }) => auth.loadingAvatar;

export const selectRole = ({ auth }) => auth.user.role;
