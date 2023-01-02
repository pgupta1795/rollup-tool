const Constants = {
  /** SUCCESS */
  LOGIN_SUCESS: 'User Logged In',
  LOGOUT_SUCESS: 'User Logged Out',

  /** WARNING */
  ACTIONS_EXISTS_WARNING: `Unable to update the selected row in db as it may already exists`,
  TYPE_NOT_CONFIGURED_WARNING: `Type is not configured or valid enovia type`,
  PARENT_EDIT_WARNING: `Can only edit leaf level elements`,

  /** INFO */
  START_LOGOUT: 'Logging Out !',
  CALCULATE_ALL: 'Calculates rollup for best available & all mass attributes',

  /** ERROR */
  LOGIN_ERROR: 'Error : Invalid Login Credentials',
  GET_ACTIONS_ERROR: 'Error : Unable to get actions',
  CREATE_ACTION_ERROR: 'Error : Unable to create the action',
  FETCH_ERROR: 'Error : Unable to fetch Objects',
  EDIT_OBJECT_ERROR:
    'Error : Unable to Update Objects, Please refresh page or try later',
  ROLLUP_MENU_SELECT: 'Please select an option',

  /** GENERAL */
  BEST_AVAILABLE: `Calculation considers Actual Mass, Estimated Mass, and Calculated Mass for each part. Actual Mass has highest priority; however should it have a value of 0 it will use Estimated Mass. If Estimated Mass also has a value of 0 it will use Calculated Mass`,

  /** COLUMN IDs */
  ENDITEM: 'endItem',
};

export default Constants;
