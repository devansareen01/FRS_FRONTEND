import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
// import imageUrl from '../../Utils/logo.jpg';
const StudentHeader = () => {
  const navigate = useNavigate();
  async function handelLogout(e) {

    e.preventDefault();
    // console.log(form)
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.BASE_URL}/api/student/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    // console.log(res);
    const message = await res.json()
    if (res.status == 200) {
      toast.success(message.message);
      setTimeout(function () {
        navigate("/login");
      }, 500)

    } else {
      toast.error(message.message);
    }

  }
  return (
    <>
      <div className="flex justify-evenly bg-white pt-4 px-9 pb-8 stick top-0 ">

        <ul className="flex w-2/4 justify-evenly ">
          {/* <img src={imageUrl} alt="logo" style={{ height: '50px' }}></img> */}

          <Link to="myCourses"><li className="font-medium m-2">Courses List</li></Link>
          <Link to="student-change-pass"><li className="font-medium m-2">Change Password</li></Link>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded " onClick={handelLogout}>Sign Out</button>

        </ul>
      </div>
      <Toaster position="top-right" richColors />
      <Outlet />
    </>


  )
}

export default StudentHeader