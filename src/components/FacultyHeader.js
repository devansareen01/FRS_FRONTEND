import { Toaster, toast } from 'sonner'
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import imageUrl from '../../Utils/logo.jpg';
const Header = () => {
  const navigate = useNavigate();
  async function handelLogout(e) {

    e.preventDefault();
    // console.log(form)
    const token = localStorage.getItem('token');

    const res = await fetch(`${process.env.BASE_URL}/api/faculty/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      }
    });
    // console.log(res);
    const data = res.json();

    if (res.status == 200) {
      toast.success(data.message);
      setTimeout(function () {
        navigate("/");
      }, 500);

    }

  }
  return (
    <>
      <div className="flex justify-between m-0 align-middle sticky   bg-white top-0">

        <img src={imageUrl} alt="logo" style={{ height: '50px' }}></img>

        <ul className="flex w-2/4 justify-evenly text-blue-800" >

          <Link to="addstudent"><li className="font-medium m-2 ">Add a Student</li></Link>
          <Link to="studentlist"><li className="font-medium m-2">Students List</li></Link>
          <Link to="faculty-change-pass"><li className="font-medium m-2">Change Password</li></Link>
          <Link to="addmultiplestudent"><li className="font-medium m-2">Add Multiple Students</li></Link>

          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded " onClick={handelLogout}>Sign Out</button>

        </ul>
      </div>
      <Toaster position="top-right" richColors />
      <Outlet />
    </>


  )
}

export default Header;