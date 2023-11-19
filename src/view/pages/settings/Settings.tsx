/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react'

import { useEffect } from "react";

// type Props = {}

// const Settings = (props: Props) => {
//   return (
//     <div>Settings</div>
//   )
// }

// export default Settings
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { SettingsDetail } from "../../../slices/settingSlice"
import { getUserSetting, updateUserSetting, updateSetting } from "../../../slices/settingSlice"
import ToggleButton from "../../../components/ToggleButton";




const settingsData = [
  {
    section: 'Communication Settings',
    items: [
      {
        label: 'Email Notifications',
        description: 'Receive Important Updates and Notifications via email',
        accessor: "email_notification"
      },
    ],

  },
  {
    section: 'Group Preferences',
    items: [
      {
        label: 'Contribution Reminders',
        description: 'Enable automated reminders to contribute to your savings group',
        accessor: "contribution_reminder"
      },
      {
        label: 'Group Join Requests',
        description: 'Allow others to send join requests to your savings group',
        accessor: "group_join_request"

      },
    ],
    accessor: " password_update "
  },
  {
    section: 'Security Settings',
    items: [
      {
        label: 'Two Factor Authentication',
        description: 'Enhance the security of your account with two-factor authentication',
        accessor: "two_factor_authentication"
      },
      {
        label: 'Password Update',
        description: 'Change your account password for added security',
        accessor: "password_update"
      },
    ],

  },
  {
    section: 'Privacy Settings',
    items: [
      {
        label: 'Profile Visibility',
        description: 'Control the visibility of your profile to other Ajo Savings users',
        accessor: "profile_visibility"
      },
      {
        label: 'Email Privacy',
        description: 'Choose whether to display your email address publicly or keep it private',
        accessor: "email_privacy"
      },
    ],


  },
  {
    section: 'Notification Preferences',
    items: [
      {
        label: 'Savings Group Updates',
        description: 'Customize your notification preferences for savings group activities',
        accessor: "savings_group_update"
      },
      {
        label: 'Personal Savings Alerts',
        description: 'Choose the types of alerts you want to receive for personal savings account',
        accessor: "personal_saving_alert"
      },
    ],

  },
  {
    section: 'Account Deactivation',
    items: [
      {
        label: 'Deactivate Account',
        description: 'Temporarily suspend or deactivate your Ajo Savings account',
        accessor: "deactivate_account"
      },

    ],

  },
];

const Settings = () => {
  const dispatch = useAppDispatch()
  const { userSettings } = useAppSelector((state) => state.setting)

  useEffect(() => {
    dispatch(getUserSetting())
  }, [dispatch])
  const handleToggle = (settingToUpdate: keyof SettingsDetail) => {

    dispatch(updateSetting(settingToUpdate));
    dispatch(updateUserSetting(settingToUpdate));
  };



  return (
    <div className="flex">
      {/* Sidebar component goes here */}
      {/* <div className="w-1/4 bg-gray-200 h-screen"> */}
      {/* Add your sidebar content here */}
      {/* </div> */}

      {/* Settings card */}
      <div className="settings-card bg-gray-200 shadow-md p-10  w-full  rounded-lg mt-0 ml-4">
        <h1 className="main-header mb-4 text-4xl font-bold">Settings</h1>
        {settingsData.map((section, index) => (
          <div className="settings-section mt-8" key={index}>
            <h1 className="settings-heading mb-0 mt-0 text-2xl font-semibold">{section.section}</h1>
            <ul className="settings-list list-none pl-0">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex justify-between items-center mt-0">
                  <div className="subheading-div mt-0">
                    <h5 className="subheading text-base font-semibold">{item.label}</h5>
                    <p className="desc text-sm">{item.description}</p>
                  </div>
                  <label className="inline-block relative w-10 h-8  mt-0 ">
                    {/* Pass the checked value as a prop */}
                    <ToggleButton
                      checked={userSettings[item.accessor as keyof SettingsDetail] as boolean}
                      onToggle={() => handleToggle(item.accessor as keyof SettingsDetail)} label={""}                    />
                  </label>

                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;














