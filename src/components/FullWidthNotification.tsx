
// import { observer } from '@magicbell/magicbell-react';

// function FullWidthNotification({ notification }) {
//   const toggleRead = () => {
//     if (!notification.isRead) notification.markAsRead();
//     else notification.markAsUnread();
//   };

//   const deleteNotification = () => {
//     notification.delete();
//   };

//   return (
//     <div className="flex p-2 bg-gray-200 rounded items-center my-4">
//       <div onClick={toggleRead} className="cursor-pointer flex-none text-center mr-2">
//         <svg
//           className={`fill-current ${
//             notification.isRead ? 'text-green-500' : 'text-orange-500'
//           } inline-block h-6 w-6`}
//         >
//           <circle cx="10" cy="10" r="5" />
//         </svg>
//       </div>
//       <div className="flex-1">
//         <p>{notification.title}</p>
//         <p className="text-gray-600 text-sm">{notification.sentAtDate.fromNow()}</p>
//       </div>
//       <div className="">
//         <button
//           type="button"
//           onClick={deleteNotification}
//           className="bg-transparent text-red-700 py-1 px-4 border border-red-500 rounded text-sm hover:bg-red-500 hover:text-white"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// // Required for the component to rerender automatically
// // when the isRead attribute is toggled
// export default observer(FullWidthNotification);