import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axiosInstance from '../../../Helpers/axios'
import { showErrMsg, showSuccessMsg } from '../../Utils/Notification/Notification'

/**
* @author
* @function ActivationEmail
**/

const ActivationEmail = (props) => {
    // console.log(useParams())
    const {activation_token} = useParams()

    const [err, seterr] = useState('')
    const [success, setsuccess] = useState('')

    useEffect(()=>{
        if(activation_token)
        {
            const activationEmail = async () =>{
                try{
                    const res = await axiosInstance.post('/users/activateEmail',{activation_token})
                    setsuccess(res.data.message)
                }
                catch(error)
                {
                    error.response.data.message && seterr(error.response.data.message)
                }
            }
            activationEmail()
        }
    },[activation_token])

  return(
    <div className="active_page">
         {err ? showErrMsg(err) : null }
           {success ? showSuccessMsg(success) : null}
    </div>
   )
  }


export default ActivationEmail