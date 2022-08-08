import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { SET_FINAL_DAY, CANCEL } from '../../languages/en/ui';
import SetUpFinalDayPopUp from './SetUpFinalDayPopUp';
import { updateUserFinalDayStatus } from 'actions/userManagement';
/**
 * @param {*} props
 * @param {Boolean} props.isBigBtn
 * @param {*} props.userProfile
 * @returns
 */
const SetUpFinalDayButton = (props) => {
  const[isSet, setIsSet] = useState(false);  
  const[finalDayDateOpen, setFinalDayDateOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.userProfile?.endDate !== undefined)
      setIsSet(true);
  }, [props.userProfile?.endDate]);
  /**
   * Call back on Set Final day  or Delete button click to trigger the action to update user status
   */
  const onFinalDayClick = (isSet) => {
    if(isSet){
      setIsSet(!isSet);
      updateUserFinalDayStatus(props.userProfile,undefined)(dispatch)
    }else{
      
      setFinalDayDateOpen(true);
    }
    
  };
  const setUpFinalDayPopupClose = () => {
    setFinalDayDateOpen(false);
  };
    
  const deactiveUser = (finalDayDate) => {
    updateUserFinalDayStatus(props.userProfile,finalDayDate)(dispatch);
    setIsSet(true);
    setFinalDayDateOpen(false);
  }

  return (
    <React.Fragment>
       <SetUpFinalDayPopUp
        open={finalDayDateOpen}
        onClose={setUpFinalDayPopupClose}
        onSave={deactiveUser}
      />
      <Button
        outline
        color="primary"
        className={`btn btn-outline-${isSet ? 'warning':'success'} ${
          props.isBigBtn ? '' : 'btn-sm'
        }  mr-1`}
        onClick={(e) => {
          onFinalDayClick(isSet);
        }}
      >
        {isSet ? CANCEL : SET_FINAL_DAY}
      </Button>
      
    </React.Fragment>
    
  );
};
export default SetUpFinalDayButton;
