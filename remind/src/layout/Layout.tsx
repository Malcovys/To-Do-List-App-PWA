import App from "../pages/app/App"

export const localStorageUidKey = "uid";
export const localStorageTaskskey = "taskList";
export const userID = window.localStorage.getItem(localStorageUidKey);

function Layout() {
  return(
    <App/>
  ) 
}

export default Layout
