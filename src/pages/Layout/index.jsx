import { Outlet } from "react-router-dom";

// Importing navbar
import Navar from '~/components/NavBar'

const index = () => (
  <>
    <Navar />
    <Outlet />
  </>
);

export default index;
