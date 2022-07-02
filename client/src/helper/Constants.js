const Constants = {
  /** SUCCESS */
  LOGIN_SUCESS: 'User Logged In',
  LOGOUT_SUCESS: 'User Logged Out',

  /** WARNING */
  ACTIONS_EXISTS_WARNING: `Unable to update the selected row in db as it may already exists`,
  TYPE_NOT_CONFIGURED_WARNING: `Type is not configured or valid enovia type`,
  PARENT_EDIT_WARNING: `Can only edit leaf level elements`,

  /** ERROR */
  LOGIN_ERROR: 'Error : Invalid Login Credentials',
  GET_ACTIONS_ERROR: 'Error : Unable to get actions',
  CREATE_ACTION_ERROR: 'Error : Unable to create the action',
  FETCH_ERROR: 'Error : Unable to fetch Objects',
  EDIT_OBJECT_ERROR: `Error : Unable to Update Objects , Please refresh page or try later`,

  /** GENERAL */
  BEST_AVAILABLE: `Calculation considers Actual Mass, Estimated Mass, and Calculated Mass for each part. Actual Mass has highest priority; however should it have a value of 0 it will use Estimated Mass. If Estimated Mass also has a value of 0 it will use Calculated Mass`,
  BEST_AVAILABLE_V2: `Expansion on ‘Best Available’, as it will consider using the Parent Part mass if the combined mass of its Child Parts is less`,
};

export default Constants;
